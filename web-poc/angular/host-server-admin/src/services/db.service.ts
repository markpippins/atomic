import { Injectable, signal, computed } from '@angular/core';
import { 
  Language, Category, Vendor, Framework, OperatingSystem, 
  EnvironmentType, ServerType, Server, ServiceType, Service, 
  ServiceConfig, ConfigType, ServiceDependency, Deployment
} from './types';

@Injectable({ providedIn: 'root' })
export class DbService {
  // Mode Flag
  debugMode = signal<boolean>(true);

  // Signals for each entity type
  languages = signal<Language[]>([]);
  categories = signal<Category[]>([]);
  vendors = signal<Vendor[]>([]);
  frameworks = signal<Framework[]>([]);
  operatingSystems = signal<OperatingSystem[]>([]);
  environmentTypes = signal<EnvironmentType[]>([]);
  serverTypes = signal<ServerType[]>([]);
  servers = signal<Server[]>([]);
  serviceTypes = signal<ServiceType[]>([]);
  services = signal<Service[]>([]);
  serviceConfigs = signal<ServiceConfig[]>([]);
  configTypes = signal<ConfigType[]>([]);
  serviceDependencies = signal<ServiceDependency[]>([]);
  deployments = signal<Deployment[]>([]);

  constructor() {
    this.seedMockData();
  }

  toggleMode() {
    this.debugMode.update(v => !v);
    if (this.debugMode()) {
      this.seedMockData(); // Reset/Ensure mock data is there
    } else {
      // In a real app, we would clear and fetch from MySQL. 
      // Here we simulate an empty state or connection error visually in the UI.
      // For usability of this demo, we will KEEP the data but log a warning that we aren't actually connecting to MySQL.
      console.warn("Switched to Regular Mode (MySQL). Since no backend exists, UI will retain current state but operations might fail.");
    }
  }

  // Generic Getter
  getAll(entityKey: string) {
    switch(entityKey) {
      case 'languages': return this.languages;
      case 'categories': return this.categories;
      case 'vendors': return this.vendors;
      case 'frameworks': return this.frameworks;
      case 'operatingSystems': return this.operatingSystems;
      case 'environmentTypes': return this.environmentTypes;
      case 'serverTypes': return this.serverTypes;
      case 'servers': return this.servers;
      case 'serviceTypes': return this.serviceTypes;
      case 'services': return this.services;
      case 'serviceConfigs': return this.serviceConfigs;
      case 'configTypes': return this.configTypes;
      case 'serviceDependencies': return this.serviceDependencies;
      case 'deployments': return this.deployments;
      default: return signal([]);
    }
  }

  // Generic CRUD
  save(entityKey: string, item: any) {
    if (!this.debugMode()) {
      alert("MySQL Connection Error: Cannot save changes in Regular Mode without a backend.");
      return;
    }

    const sig = this.getAll(entityKey);
    const current = sig();
    
    if (item.id) {
      // Update
      sig.set(current.map((i: any) => i.id === item.id ? { ...item } : i));
    } else {
      // Create
      const newItem = { ...item, id: crypto.randomUUID() };
      sig.set([...current, newItem]);
    }
  }

  delete(entityKey: string, id: string) {
    if (!this.debugMode()) {
      alert("MySQL Connection Error: Cannot delete in Regular Mode without a backend.");
      return;
    }
    const sig = this.getAll(entityKey);
    sig.set(sig().filter((i: any) => i.id !== id));
  }

  private seedMockData() {
    // Seed Vendors
    const vGoogle = 'v_google';
    const vMs = 'v_ms';
    const vFb = 'v_fb';
    const vAws = 'v_aws';
    this.vendors.set([
      { id: vGoogle, name: 'Google', url: 'https://google.com', active_flag: true },
      { id: vMs, name: 'Microsoft', url: 'https://microsoft.com', active_flag: true },
      { id: vFb, name: 'Meta', url: 'https://meta.com', active_flag: true },
      { id: vAws, name: 'Amazon', url: 'https://aws.amazon.com', active_flag: true },
    ]);

    // Seed Categories
    this.categories.set([
      { id: 'c_fe', name: 'Frontend', active_flag: true },
      { id: 'c_be', name: 'Backend', active_flag: true },
      { id: 'c_infra', name: 'Infrastructure', active_flag: true },
    ]);

    // Seed Languages
    this.languages.set([
      { id: 'l_ts', name: 'TypeScript', description: 'Typed superset of JavaScript.', url: 'https://typescriptlang.org', current_version: '5.3', lts_version: '5.0', active_flag: true },
      { id: 'l_go', name: 'Go', description: 'Statically typed, compiled language.', url: 'https://go.dev', current_version: '1.21', lts_version: '1.20', active_flag: true },
      { id: 'l_py', name: 'Python', description: 'Interpreted, high-level.', url: 'https://python.org', current_version: '3.12', lts_version: '3.10', active_flag: true },
    ]);

    // Seed Frameworks
    this.frameworks.set([
      { id: 'f_ang', vendor_id: vGoogle, name: 'Angular', description: 'Platform for building mobile and desktop web applications.', category_id: 'c_fe', language_id: 'l_ts', current_version: '17.0', lts_version: '16.0', url: 'https://angular.io', active_flag: true },
      { id: 'f_react', vendor_id: vFb, name: 'React', description: 'Library for web and native user interfaces.', category_id: 'c_fe', language_id: 'l_ts', current_version: '18.2', lts_version: '18.0', url: 'https://react.dev', active_flag: true },
    ]);

    // Seed OS
    this.operatingSystems.set([
      { id: 'os_ubu', vendor_id: 'v_canonical', name: 'Ubuntu Server', description: 'Popular Linux distribution.', current_version: '23.10', lts_version: '22.04', active_flag: true },
      { id: 'os_win', vendor_id: vMs, name: 'Windows Server', description: 'Server OS by Microsoft.', current_version: '2022', lts_version: '2019', active_flag: true },
    ]);

    // Seed Env Types
    this.environmentTypes.set([
      { id: 'e_prod', name: 'Production', active_flag: true },
      { id: 'e_stage', name: 'Staging', active_flag: true },
      { id: 'e_dev', name: 'Development', active_flag: true },
    ]);

    // Seed Server Types
    this.serverTypes.set([
      { id: 'st_vm', name: 'Virtual Machine', active_flag: true },
      { id: 'st_phy', name: 'Physical Blade', active_flag: true },
      { id: 'st_cont', name: 'Container Node', active_flag: true },
    ]);

    // Seed Servers
    this.servers.set([
      { id: 'srv_01', hostname: 'prod-api-01', ip_address: '10.0.1.5', server_type_id: 'st_vm', environment_type_id: 'e_prod', operating_system_id: 'os_ubu', cpu_cores: 8, memory: '16GB', disk: '500GB SSD', status: 'Online', description: 'Primary API Gateway Node', active_flag: true },
      { id: 'srv_02', hostname: 'db-primary', ip_address: '10.0.1.20', server_type_id: 'st_phy', environment_type_id: 'e_prod', operating_system_id: 'os_ubu', cpu_cores: 32, memory: '128GB', disk: '4TB NVMe', status: 'Online', description: 'Master Database', active_flag: true },
      { id: 'srv_03', hostname: 'dev-sandbox', ip_address: '10.0.2.10', server_type_id: 'st_vm', environment_type_id: 'e_dev', operating_system_id: 'os_win', cpu_cores: 4, memory: '8GB', disk: '100GB', status: 'Offline', description: 'Dev Playground', active_flag: false },
    ]);

    // Seed Service Types
    this.serviceTypes.set([
      { id: 'svt_micro', name: 'Microservice', active_flag: true },
      { id: 'svt_mono', name: 'Monolith', active_flag: true },
      { id: 'svt_batch', name: 'Batch Job', active_flag: true },
    ]);

    // Seed Services
    this.services.set([
      { id: 'svc_auth', name: 'Auth Service', description: 'Handles user authentication and token generation.', framework_id: 'f_ang', service_type_id: 'svt_micro', default_port: 3000, api_base_path: '/api/v1/auth', repository_url: 'git://repo/auth', version: '2.1.0', status: 'Active', active_flag: true },
      { id: 'svc_pay', name: 'Payment Gateway', description: 'Processes credit card transactions.', framework_id: 'f_react', service_type_id: 'svt_micro', default_port: 8080, api_base_path: '/api/v1/payments', repository_url: 'git://repo/pay', version: '1.0.5', status: 'Active', active_flag: true },
    ]);

    // Seed Config Types
    this.configTypes.set([
      { id: 'ct_db', name: 'Database', active_flag: true },
      { id: 'ct_api', name: 'API Key', active_flag: true },
      { id: 'ct_flag', name: 'Feature Flag', active_flag: true }
    ]);

    // Seed Service Configs
    this.serviceConfigs.set([
      { id: 'sc_1', service_id: 'svc_pay', config_type_id: 'ct_api', description: 'Stripe API Key', config_key: 'STRIPE_KEY', config_value: 'sk_test_123456', environment_id: 'e_dev', active_flag: true },
      { id: 'sc_2', service_id: 'svc_auth', config_type_id: 'ct_db', description: 'DB Connection String', config_key: 'DB_URL', config_value: 'postgres://user:pass@localhost:5432/db', environment_id: 'e_dev', active_flag: true },
    ]);

    // Seed Service Dependencies
    this.serviceDependencies.set([
      { id: 'sd_1', service_id: 'svc_pay', target_service_id: 'svc_auth', criticality: 'High', description: 'Payment needs Auth to validate tokens', active_flag: true }
    ]);

    // Seed Deployments
    this.deployments.set([
      { id: 'dep_1', service_id: 'svc_auth', environment_id: 'e_prod', server_id: 'srv_01', version: '2.1.0', deployed_at: '2023-11-15T14:30:00', status: 'Success', active_flag: true },
      { id: 'dep_2', service_id: 'svc_pay', environment_id: 'e_dev', server_id: 'srv_03', version: '1.0.5', deployed_at: '2023-11-16T09:15:00', status: 'Success', active_flag: true }
    ]);
  }
}