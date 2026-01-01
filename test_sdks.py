#!/usr/bin/env python3
import subprocess
import sys
import requests


def test_gateway_health():
    try:
        response = requests.get("http://localhost:8080/health", timeout=5)
        if response.status_code == 200:
            print("✅ Broker Gateway is running")
            return True
        else:
            print(f"❌ Broker Gateway health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Cannot reach broker gateway: {e}")
        return False


def test_python_sdk():
    try:
        cmd = [sys.executable, "-c", 
            "import sys; sys.path.append('python/broker-client'); from atomic_broker_sdk import create_client; client = create_client(); response = client.invoke_operation('ping', {'test': 'python-sdk'}); print('✅ Python SDK: OK' if response.success else f'❌ Python SDK: {response.errors}')"]
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
        return "Python SDK working" in result.stdout
    except Exception as e:
        print(f"❌ Python SDK test failed: {e}")
        return False


def test_nodejs_sdk():
    try:
        cmd = [sys.executable, "-c", 
            "import subprocess; subprocess.run(['node', '-e', \"require('./atomic_broker_sdk.js'); client = require('./atomic_broker_sdk.js')(); client.invokeOperation('ping', {test: 'nodejs-sdk'}).then(response => console.log(response.success ? '✅ Node.js SDK: OK' : '❌ Node.js SDK: ' + response.errors.map(e => e.message).join(', ')))\")"]
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
        return "Node.js SDK working" in result.stdout
    except Exception as e:
        print(f"❌ Node.js SDK test failed: {e}")
        return False


def test_go_sdk():
    try:
        cmd = ["cd", "go/broker-client", "&&", "go", "run", "main.go"]
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
        return "Go SDK working" in result.stdout
    except Exception as e:
        print(f"❌ Go SDK test failed: {e}")
        return False


def main():
    print("🧪 Testing Atomic Broker Gateway SDKs")
    print("=" * 50)
    
    # Test broker gateway health
    gateway_ok = test_gateway_health()
    time.sleep(1)
    
    # Test all SDKs
    results = [
        test_python_sdk(),
        test_nodejs_sdk(),
        test_go_sdk()
    ]
    
    success_count = sum(results)
    print(f"\n📊 Results: {success_count}/3 SDKs working successfully")
    
    if success_count == 3:
        print("🚀 All SDKs ready for integration!")
        return True
    else:
        print("⚠️  Some SDKs need attention before integration")
        return False


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)