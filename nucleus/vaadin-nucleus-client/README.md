# Nucleus Client - Vaadin Application

A modern Vaadin web application that provides a polished user interface for the Nucleus service broker system.

## Features

- **Modern UI**: Clean, professional interface using Vaadin 24 with custom theming
- **User Authentication**: Login and registration via service broker API
- **User Management**: Profile management and session handling
- **File Upload**: Drag-and-drop file upload with progress tracking
- **Responsive Design**: Mobile-friendly responsive layout
- **Service Broker Integration**: Full integration with the Nucleus service broker system

## Architecture

### Main Components

1. **MainLayout**: App shell with navigation toolbar and drawer
2. **HomeView**: Welcome page with user registration form (when not logged in)
3. **ProfileView**: User profile display and editing
4. **FileUploadView**: File upload interface with progress tracking
5. **UserService**: Authentication and user management
6. **BrokerClient**: Service broker API integration

### Technology Stack

- **Framework**: Spring Boot 3.5.5 + Vaadin 24.9.0
- **Java**: Java 21
- **Build Tool**: Maven
- **UI Components**: Vaadin Flow components
- **Styling**: Custom CSS with Lumo theme
- **HTTP Client**: Spring RestTemplate for service broker communication

## Setup and Installation

### Prerequisites

- Java 21 or later
- Maven 3.6 or later
- Running Nucleus Service Broker (default: http://localhost:8080)

### Installation

1. **Clone and navigate to the Vaadin client directory:**
   ```bash
   cd nucleus-client/vaadin-client
   ```

2. **Install dependencies:**
   ```bash
   mvn clean install
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the application:**
   Open your browser to `http://localhost:8081`

## Configuration

### Application Properties

Configure the application in `src/main/resources/application.properties`:

```properties
# Service Broker URL
broker.url=http://localhost:8080/api/broker

# Server port
server.port=8081

# Vaadin configuration
vaadin.launch-browser=true
```

### Service Broker Endpoints

The application expects these service broker endpoints:

- **User Service**:
  - `POST /api/broker/submitRequest` (login, getUserByAlias, create)
- **Upload Service**:
  - `POST /api/broker/submitRequestWithFile` (processFile)

## Usage

### User Registration

1. Open the application (when not logged in)
2. Fill out the registration form on the home page:
   - Username (alias)
   - Full Name
   - Email Address
3. Click "Create Account"
4. Once created, use the login button in the toolbar

### User Login

1. Click the "Login" button in the top-right toolbar
2. Enter your username and password
3. Click "Login" to authenticate via the service broker

### File Upload

1. Navigate to the "File Upload" page (after login)
2. Drag and drop files or click to browse
3. Monitor upload progress with the progress bar
4. View upload results and server responses

### Profile Management

1. Navigate to the "Profile" page (after login)
2. View your account information
3. Click "Edit Profile" to modify details (placeholder functionality)
4. Use "Refresh" to reload profile data from the service broker

## Development

### Project Structure

```
vaadin-client/
├── src/main/java/com/angrysurfer/spring/
│   ├── NucleusClientApplication.java    # Spring Boot main class
│   └── vaadin/
│       ├── layout/
│       │   └── MainLayout.java          # App shell layout
│       ├── model/                       # Data models
│       │   ├── User.java
│       │   ├── ServiceRequest.java
│       │   └── ServiceResponse.java
│       ├── service/                     # Business services
│       │   ├── BrokerClient.java        # Service broker integration
│       │   └── UserService.java         # User management
│       └── views/                       # UI views
│           ├── HomeView.java            # Welcome/registration page
│           ├── ProfileView.java         # User profile
│           └── FileUploadView.java      # File upload interface
├── src/main/resources/
│   ├── application.properties           # Configuration
│   └── themes/my-theme/                 # Custom styling
│       ├── styles.css                   # Custom CSS
│       └── theme.json                   # Theme configuration
└── pom.xml                             # Maven dependencies
```

### Custom Styling

The application uses a custom theme with:
- Modern color palette (blue primary, green success, red error)
- Gradient backgrounds and subtle shadows
- Smooth animations and transitions
- Mobile-responsive design
- Enhanced form styling and button effects

### Service Integration

All service calls go through the `BrokerClient` class, which:
- Handles HTTP communication with the service broker
- Provides typed responses using Jackson JSON processing
- Includes error handling and logging
- Supports both regular and file upload requests

## Troubleshooting

### Common Issues

1. **Service Broker Connection Failed**
   - Verify the service broker is running on http://localhost:8080
   - Check the `broker.url` property in application.properties

2. **Login Issues**
   - Ensure users exist in the service broker system
   - Check service broker logs for authentication errors

3. **File Upload Problems**
   - Verify the upload service is properly configured in the broker
   - Check file size limits (default: 50MB)
   - Ensure file types are in the accepted list

4. **Theme Not Loading**
   - Run `mvn clean install` to regenerate frontend resources
   - Check that the theme files exist in `src/main/resources/themes/my-theme/`

### Logging

Enable debug logging for detailed information:

```properties
logging.level.com.angrysurfer=DEBUG
```

## API Integration

### Service Request Format

```json
{
  "service": "userService",
  "operation": "login",
  "params": {
    "alias": "username",
    "password": "password"
  },
  "requestId": "vaadin-client-1234567890"
}
```

### Service Response Format

```json
{
  "ok": true,
  "data": {
    "id": 1,
    "alias": "username",
    "name": "Full Name",
    "email": "user@example.com",
    "avatarUrl": "https://example.com/avatar.jpg"
  },
  "errors": [],
  "requestId": "vaadin-client-1234567890",
  "ts": "2024-01-15T10:30:00Z"
}
```

## License

This project is part of the Nucleus service broker system.