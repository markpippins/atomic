export interface BaseEntity {
  id: string; // Using string UUIDs for easier mock handling
  active_flag: boolean;
  [key: string]: any;
}

export interface Language extends BaseEntity {
  name: string;
  description: string;
  url: string;
  current_version: string;
  lts_version: string;
}

export interface Category extends BaseEntity {
  name: string;
}

export interface Vendor extends BaseEntity {
  name: string;
  url: string;
}

export interface Framework extends BaseEntity {
  vendor_id: string;
  name: string;
  description: string;
  category_id: string; // Mapped from 'category' in prompt for better FK handling
  language_id: string; // Mapped from 'language'
  current_version: string;
  lts_version: string;
  url: string;
}

export interface OperatingSystem extends BaseEntity {
  vendor_id: string;
  name: string;
  description: string;
  current_version: string;
  lts_version: string;
}

export interface EnvironmentType extends BaseEntity {
  name: string;
}

export interface ServerType extends BaseEntity {
  name: string;
}

export interface Server extends BaseEntity {
  hostname: string;
  ip_address: string;
  server_type_id: string;
  environment_type_id: string;
  operating_system_id: string;
  cpu_cores: number;
  memory: string;
  disk: string;
  status: 'Online' | 'Offline' | 'Maintenance';
  description: string;
}

export interface ServiceType extends BaseEntity {
  name: string;
}

export interface Service extends BaseEntity {
  name: string;
  description: string;
  framework_id: string;
  service_type_id: string;
  default_port: number;
  api_base_path: string;
  repository_url: string;
  version: string;
  status: 'Active' | 'Deprecated' | 'Development';
}

export interface ConfigType extends BaseEntity {
  name: string;
}

export interface ServiceConfig extends BaseEntity {
  service_id: string; // Link to Service
  config_type_id: string;
  description: string;
  config_key: string;
  config_value: string;
  environment_id: string; // Assuming environment_type_id
}

export interface ServiceDependency extends BaseEntity {
  service_id: string; // Consumer
  target_service_id: string; // Provider
  criticality: 'High' | 'Medium' | 'Low';
  description: string;
}

export interface Deployment extends BaseEntity {
  service_id: string;
  environment_id: string;
  server_id: string;
  version: string;
  deployed_at: string; // ISO Date String
  status: 'Success' | 'Failed' | 'Pending' | 'Rolled Back';
}

// UI Schema Definition Helper
export type FieldType = 'text' | 'textarea' | 'number' | 'select' | 'boolean' | 'url' | 'datetime-local';

export interface FieldDefinition {
  key: string;
  label: string;
  type: FieldType;
  optionsSource?: string; // Key of the store to pull options from
  required?: boolean;
}

export interface EntitySchema {
  key: string; // Store key
  label: string;
  fields: FieldDefinition[];
}