import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudViewComponent } from './components/crud-view.component';
import { DbService } from './services/db.service';
import { EntitySchema, FieldDefinition } from './services/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CrudViewComponent],
  template: `
    <div class="flex h-screen bg-slate-50 text-slate-800 font-sans">
      
      <!-- Sidebar -->
      <aside class="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20">
        <div class="p-6 border-b border-slate-800 flex items-center gap-3">
          <div class="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg">N</div>
          <h1 class="font-bold text-lg tracking-tight">Nexus<span class="text-slate-400 font-light">Console</span></h1>
        </div>

        <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          @for (group of navGroups; track group.label) {
            <div class="mb-6">
              <h3 class="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{{ group.label }}</h3>
              @for (item of group.items; track item.id) {
                <button (click)="activeTab.set(item.id)" 
                  [class]="activeTab() === item.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'"
                  class="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group">
                  <span [innerHTML]="item.icon"></span>
                  {{ item.label }}
                  @if (item.count) {
                    <span class="ml-auto bg-slate-800 text-slate-300 py-0.5 px-2 rounded-full text-xs group-hover:bg-slate-700">
                      {{ db.getAll(item.schemaKey)().length }}
                    </span>
                  }
                </button>
              }
            </div>
          }
        </nav>

        <!-- Debug Toggle -->
        <div class="p-4 border-t border-slate-800 bg-slate-900">
          <div class="flex items-center justify-between bg-slate-800 rounded-lg p-3 border border-slate-700">
            <div class="flex flex-col">
              <span class="text-xs font-medium text-slate-300">Data Source</span>
              <span class="text-[10px] uppercase font-bold tracking-wider" 
                [class]="db.debugMode() ? 'text-green-400' : 'text-blue-400'">
                {{ db.debugMode() ? 'Mock DB (Debug)' : 'MySQL (Prod)' }}
              </span>
            </div>
            <button (click)="db.toggleMode()" 
              [class]="db.debugMode() ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'"
              class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none">
              <span [class.translate-x-5]="!db.debugMode()" [class.translate-x-0]="db.debugMode()"
                class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-current shadow ring-0 transition duration-200 ease-in-out"></span>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col overflow-hidden bg-slate-100">
        <!-- Top Bar -->
        <header class="bg-white shadow-sm border-b border-slate-200 h-16 flex items-center justify-between px-8 z-10">
          <h2 class="text-xl font-bold text-slate-800">{{ getActiveTabLabel() }}</h2>
          <div class="flex items-center gap-4">
             <div class="text-sm text-slate-500">System Status: <span class="text-green-600 font-medium">Operational</span></div>
             <div class="h-8 w-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs">AD</div>
          </div>
        </header>

        <!-- Content Area -->
        <div class="flex-1 p-6 overflow-hidden">
          @if (getActiveSchema(); as schema) {
            <app-crud-view [schema]="schema"></app-crud-view>
          } @else {
            <div class="flex items-center justify-center h-full text-slate-400">
              Select an item from the menu
            </div>
          }
        </div>
      </main>
    </div>
  `
})
export class AppComponent {
  db = inject(DbService);
  activeTab = signal<string>('servers');

  // Definitions for all schemas
  schemas: Record<string, EntitySchema> = {
    servers: {
      key: 'servers', label: 'Servers',
      fields: [
        { key: 'hostname', label: 'Hostname', type: 'text', required: true },
        { key: 'ip_address', label: 'IP Address', type: 'text', required: true },
        { key: 'server_type_id', label: 'Type', type: 'select', optionsSource: 'serverTypes', required: true },
        { key: 'environment_type_id', label: 'Environment', type: 'select', optionsSource: 'environmentTypes', required: true },
        { key: 'operating_system_id', label: 'OS', type: 'select', optionsSource: 'operatingSystems', required: true },
        { key: 'cpu_cores', label: 'CPU Cores', type: 'number', required: true },
        { key: 'memory', label: 'Memory', type: 'text', required: true },
        { key: 'disk', label: 'Disk Space', type: 'text', required: true },
        { key: 'status', label: 'Status', type: 'text', required: true }, 
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'active_flag', label: 'Active', type: 'boolean' }
      ]
    },
    services: {
      key: 'services', label: 'Services',
      fields: [
        { key: 'name', label: 'Service Name', type: 'text', required: true },
        { key: 'service_type_id', label: 'Type', type: 'select', optionsSource: 'serviceTypes', required: true },
        { key: 'framework_id', label: 'Framework', type: 'select', optionsSource: 'frameworks', required: true },
        { key: 'version', label: 'Version', type: 'text', required: true },
        { key: 'default_port', label: 'Port', type: 'number', required: true },
        { key: 'api_base_path', label: 'Base Path', type: 'text', required: true },
        { key: 'repository_url', label: 'Repo URL', type: 'url' },
        { key: 'status', label: 'Status', type: 'text', required: true },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'active_flag', label: 'Active', type: 'boolean' }
      ]
    },
    serviceConfigs: {
      key: 'serviceConfigs', label: 'Service Configurations',
      fields: [
        { key: 'service_id', label: 'Service', type: 'select', optionsSource: 'services', required: true },
        { key: 'config_key', label: 'Key', type: 'text', required: true },
        { key: 'config_value', label: 'Value', type: 'text', required: true },
        { key: 'config_type_id', label: 'Type', type: 'select', optionsSource: 'configTypes', required: true },
        { key: 'environment_id', label: 'Environment', type: 'select', optionsSource: 'environmentTypes', required: true },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'active_flag', label: 'Active', type: 'boolean' }
      ]
    },
    serviceDependencies: {
      key: 'serviceDependencies', label: 'Service Dependencies',
      fields: [
        { key: 'service_id', label: 'Consumer Service', type: 'select', optionsSource: 'services', required: true },
        { key: 'target_service_id', label: 'Provider Service', type: 'select', optionsSource: 'services', required: true },
        { key: 'criticality', label: 'Criticality', type: 'text', required: true }, // Simple text for now
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'active_flag', label: 'Active', type: 'boolean' }
      ]
    },
    deployments: {
      key: 'deployments', label: 'Deployments',
      fields: [
        { key: 'service_id', label: 'Service', type: 'select', optionsSource: 'services', required: true },
        { key: 'version', label: 'Version', type: 'text', required: true },
        { key: 'environment_id', label: 'Environment', type: 'select', optionsSource: 'environmentTypes', required: true },
        { key: 'server_id', label: 'Server', type: 'select', optionsSource: 'servers', required: true },
        { key: 'deployed_at', label: 'Deployed At', type: 'datetime-local', required: true },
        { key: 'status', label: 'Status', type: 'text', required: true },
        { key: 'active_flag', label: 'Active', type: 'boolean' }
      ]
    },
    frameworks: {
      key: 'frameworks', label: 'Frameworks',
      fields: [
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'vendor_id', label: 'Vendor', type: 'select', optionsSource: 'vendors', required: true },
        { key: 'category_id', label: 'Category', type: 'select', optionsSource: 'categories', required: true },
        { key: 'language_id', label: 'Language', type: 'select', optionsSource: 'languages', required: true },
        { key: 'current_version', label: 'Current Ver.', type: 'text' },
        { key: 'lts_version', label: 'LTS Ver.', type: 'text' },
        { key: 'url', label: 'Website', type: 'url' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'active_flag', label: 'Active', type: 'boolean' }
      ]
    },
    operatingSystems: {
      key: 'operatingSystems', label: 'Operating Systems',
      fields: [
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'vendor_id', label: 'Vendor', type: 'select', optionsSource: 'vendors', required: true },
        { key: 'current_version', label: 'Current Ver.', type: 'text' },
        { key: 'lts_version', label: 'LTS Ver.', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'active_flag', label: 'Active', type: 'boolean' }
      ]
    },
    languages: {
      key: 'languages', label: 'Languages',
      fields: [
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'current_version', label: 'Current Ver.', type: 'text' },
        { key: 'lts_version', label: 'LTS Ver.', type: 'text' },
        { key: 'url', label: 'Website', type: 'url' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'active_flag', label: 'Active', type: 'boolean' }
      ]
    },
    vendors: {
      key: 'vendors', label: 'Vendors',
      fields: [
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'url', label: 'Website', type: 'url' },
        { key: 'active_flag', label: 'Active', type: 'boolean' }
      ]
    },
    categories: {
      key: 'categories', label: 'Categories',
      fields: [
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'active_flag', label: 'Active', type: 'boolean' }
      ]
    },
    environmentTypes: {
      key: 'environmentTypes', label: 'Environment Types',
      fields: [
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'active_flag', label: 'Active', type: 'boolean' }
      ]
    },
    serverTypes: {
      key: 'serverTypes', label: 'Server Types',
      fields: [
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'active_flag', label: 'Active', type: 'boolean' }
      ]
    },
    serviceTypes: {
      key: 'serviceTypes', label: 'Service Types',
      fields: [
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'active_flag', label: 'Active', type: 'boolean' }
      ]
    },
    configTypes: {
      key: 'configTypes', label: 'Config Types',
      fields: [
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'active_flag', label: 'Active', type: 'boolean' }
      ]
    }
  };

  navGroups = [
    {
      label: 'Operations',
      items: [
         { id: 'deployments', label: 'Deployments', schemaKey: 'deployments', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>', count: true },
      ]
    },
    {
      label: 'Infrastructure',
      items: [
        { id: 'servers', label: 'Servers', schemaKey: 'servers', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>', count: true },
        { id: 'services', label: 'Services', schemaKey: 'services', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>', count: true },
        { id: 'serviceDependencies', label: 'Dependencies', schemaKey: 'serviceDependencies', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>', count: true },
        { id: 'serviceConfigs', label: 'Configurations', schemaKey: 'serviceConfigs', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>', count: false },
      ]
    },
    {
      label: 'Catalog',
      items: [
        { id: 'frameworks', label: 'Frameworks', schemaKey: 'frameworks', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>', count: false },
        { id: 'operatingSystems', label: 'OS', schemaKey: 'operatingSystems', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>', count: false },
        { id: 'languages', label: 'Languages', schemaKey: 'languages', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>', count: false },
        { id: 'vendors', label: 'Vendors', schemaKey: 'vendors', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>', count: false },
      ]
    },
    {
      label: 'Lookups',
      items: [
        { id: 'categories', label: 'Categories', schemaKey: 'categories', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>', count: false },
        { id: 'environmentTypes', label: 'Env Types', schemaKey: 'environmentTypes', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>', count: false },
        { id: 'serverTypes', label: 'Server Types', schemaKey: 'serverTypes', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>', count: false },
        { id: 'serviceTypes', label: 'Service Types', schemaKey: 'serviceTypes', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>', count: false },
        { id: 'configTypes', label: 'Config Types', schemaKey: 'configTypes', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>', count: false },
      ]
    }
  ];

  getActiveSchema(): EntitySchema | undefined {
    return this.schemas[this.activeTab()];
  }

  getActiveTabLabel(): string {
    for (const group of this.navGroups) {
      const item = group.items.find(i => i.id === this.activeTab());
      if (item) return item.label;
    }
    return 'Dashboard';
  }
}