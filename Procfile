# Databases (run these manually first)
# mysql: start-mysql.sh
# mongodb: mongodb-docker-start.bat

# Spring Boot Services
broker-gateway: cd spring/broker-gateway && ./mvnw spring-boot:run
user-access-service: cd spring/user-access-service && ./mvnw spring-boot:run -Dspring-boot.run.arguments="--server.port=8081"
login-service: cd spring/login-service && ./mvnw spring-boot:run -Dspring-boot.run.arguments="--server.port=8082"
user-service: cd spring/user-service && ./mvnw spring-boot:run -Dspring-boot.run.arguments="--server.port=8083"

# Node.js Services
file-system-server: cd node/file-system-server && npm start

# Web Applications
nextjs-api-tester: cd web/nextjs-api-tester && npm run dev -- --port 3000
nextjs-cool-people: cd web/nextjs-cool-people && npm run dev -- --port 3002