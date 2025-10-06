#### Nucleus

- this a multi-module Spring Boot project
- it has the following modules:
  - `broker-gateway`: this module contains the code for the broker gateway
  - `broker-service`: this module contains the code for the broker service
  - `broker-service-api`: this module contains the code for the broker service API, meaning shared between the broker gateway and broker service as well as other modules
  - `broker-service-spi`: this module contains the code for the broker service SPI, meaning that services that implement this SPI can be used by the broker service
  - `
