# Nexus - Atomic Admin Interface Blueprint

## Overview
Nexus is an Angular-based administrative interface for the Atomic platform. It provides a file-explorer-like experience for browsing and managing platform resources such as Service Registries, Gateways, and File Systems, as well as a Service Mesh visualization.

## Architecture
- **Framework**: Angular v20+ (Standalone Components, Signals, OnPush).
- **State Management**: Signals and local component state.
- **Providers**: `TreeProvider` interface for abstracting file system sources (Local, Remote, Host Server).
- **Navigation**: Path-based navigation (string arrays).

## Current Feature Set

### File Explorer
- **Default View**: The application starts in File Explorer mode.
- **Root Structure**:
  - **Infrastructure**: A virtual folder containing:
    - **File Systems**: Local and remote file systems.
    - **Gateways**: Broker gateway profiles.
    - **Service Registries**: Host server profiles (formerly "Host Servers").
    - **Users**: browsing of host user profiles (formerly at root).
  - **Platform Management**: Management nodes for the active platform context (Deployments, Servers, Services, Users-Management).
  - **Local Session**: In-browser IndexedDB storage.
- **Navigation Logic**:
  - Virtual folders (Infrastructure, Gateways, etc.) are "unwrapped" in the path logic but presented as containers.
  - "Service Registries" lists profiles but currently restricts deep navigation into them from this view (informational only).

### Service Mesh
- **Visualization**: 3D graph visualization of services and connections.
- **Controls**: Toolbar controls for camera, simulation, and styling.

### UI/UX
- **Toolbar**: Dynamic toolbar that hides file explorer controls when at the Home root.
- **Detail Pane**: Context-sensitive detail pane, hidden at Home root.
- **Theme**: Dark/Light mode support.

## Recent Changes (Refactoring File Explorer)
- **Renaming**:
  - "Host Servers" -> "Service Registries".
  - "Hosts" -> "Servers" (in Platform Management).
- **Restructuring**:
  - Moved "Users" node from Root to "Infrastructure".
  - "Service Registries" and "Gateways" are now consistently grouped under "Infrastructure".
- **Refinement**:
  - Toolbar and Detail Pane visibility logic updated to be cleaner on the Home screen.
  - Default view mode set to 'file-explorer'.

## Planned Future Work
- Enable deep navigation into "Service Registries" profiles to view their Platform Management nodes contextually.
- enhance "Users" browsing capabilities.
