import { Component, input, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbService } from '../services/db.service';
import { EntitySchema, FieldDefinition } from '../services/types';

@Component({
  selector: 'app-crud-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-col h-full bg-white rounded-lg shadow-sm border border-slate-200">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-lg">
        <div>
          <h2 class="text-xl font-bold text-slate-800">{{ schema().label }}</h2>
          <p class="text-sm text-slate-500">Manage {{ schema().label.toLowerCase() }} records</p>
        </div>
        <button (click)="openCreate()" 
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Add New
        </button>
      </div>

      <!-- Table Container -->
      <div class="flex-1 overflow-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead class="bg-slate-50 sticky top-0 z-10 text-xs uppercase text-slate-500 font-semibold tracking-wider">
            <tr>
              @for (field of displayFields(); track field.key) {
                <th class="px-6 py-3 border-b border-slate-200">{{ field.label }}</th>
              }
              <th class="px-6 py-3 border-b border-slate-200 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            @for (item of data(); track item.id) {
              <tr class="hover:bg-slate-50/80 transition-colors group">
                @for (field of displayFields(); track field.key) {
                  <td class="px-6 py-4 text-sm text-slate-700 whitespace-nowrap max-w-xs overflow-hidden text-ellipsis">
                    @if (field.type === 'boolean') {
                      <span [class]="item[field.key] ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-2 py-0.5 rounded text-xs font-medium">
                        {{ item[field.key] ? 'Active' : 'Inactive' }}
                      </span>
                    } @else if (field.optionsSource) {
                       {{ getLookupLabel(field.optionsSource, item[field.key]) }}
                    } @else if (field.key === 'url' || field.key.includes('url')) {
                       <a [href]="item[field.key]" target="_blank" class="text-indigo-600 hover:underline flex items-center gap-1">
                         Link 
                         <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                       </a>
                    } @else {
                      {{ item[field.key] }}
                    }
                  </td>
                }
                <td class="px-6 py-4 text-right text-sm font-medium">
                  <div class="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-2">
                    <button (click)="edit(item)" class="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-2 py-1 rounded">Edit</button>
                    <button (click)="delete(item.id)" class="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded">Delete</button>
                  </div>
                </td>
              </tr>
            } @empty {
              <tr>
                <td [attr.colspan]="displayFields().length + 1" class="px-6 py-12 text-center text-slate-400">
                  <div class="flex flex-col items-center">
                    <svg class="w-12 h-12 mb-3 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
                    <span>No records found. Create one to get started.</span>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form -->
    @if (isModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 class="text-lg font-bold text-slate-800">{{ editingId() ? 'Edit' : 'Create' }} {{ schema().label }}</h3>
            <button (click)="closeModal()" class="text-slate-400 hover:text-slate-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          
          <div class="p-6 overflow-y-auto custom-scrollbar">
            <form [formGroup]="form" (ngSubmit)="save()" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                @for (field of schema().fields; track field.key) {
                  <div [class.col-span-2]="field.type === 'textarea' || field.type === 'url' || field.key === 'description'" class="space-y-1">
                    <label [for]="field.key" class="block text-sm font-medium text-slate-700">
                      {{ field.label }}
                      @if(field.required){<span class="text-red-500">*</span>}
                    </label>
                    
                    @if (field.type === 'textarea') {
                      <textarea [id]="field.key" [formControlName]="field.key" rows="4" 
                        class="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"></textarea>
                    } @else if (field.type === 'select') {
                      <select [id]="field.key" [formControlName]="field.key" 
                        class="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2 bg-white">
                        <option value="">Select...</option>
                        @for (opt of getOptions(field.optionsSource); track opt.id) {
                          <option [value]="opt.id">{{ opt.name }}</option>
                        }
                      </select>
                    } @else if (field.type === 'boolean') {
                      <div class="flex items-center mt-2">
                        <input type="checkbox" [id]="field.key" [formControlName]="field.key" 
                          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                        <label [for]="field.key" class="ml-2 block text-sm text-slate-600">Enabled</label>
                      </div>
                    } @else {
                      <input [type]="field.type === 'number' ? 'number' : 'text'" [id]="field.key" [formControlName]="field.key" 
                        class="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2">
                    }
                  </div>
                }
              </div>
            </form>
          </div>

          <div class="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
            <button (click)="closeModal()" class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50">Cancel</button>
            <button (click)="save()" [disabled]="form.invalid" 
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
              {{ editingId() ? 'Update' : 'Create' }}
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class CrudViewComponent {
  schema = input.required<EntitySchema>();
  
  db = inject(DbService);
  fb = inject(FormBuilder);
  
  data = computed(() => {
    const key = this.schema().key;
    return this.db.getAll(key)();
  });

  displayFields = computed(() => {
    // Show first 5 fields + active_flag in table to avoid clutter, unless specified otherwise
    return this.schema().fields.filter(f => f.key !== 'id').slice(0, 6);
  });

  isModalOpen = signal(false);
  editingId = signal<string | null>(null);
  form: FormGroup = this.fb.group({});

  constructor() {
    effect(() => {
      // Rebuild form when schema changes
      const group: any = {};
      this.schema().fields.forEach(f => {
        const validators = f.required ? [Validators.required] : [];
        // Default active_flag to true
        const initialVal = f.key === 'active_flag' ? true : '';
        group[f.key] = [initialVal, validators];
      });
      this.form = this.fb.group(group);
    });
  }

  getOptions(sourceKey: string | undefined): any[] {
    if (!sourceKey) return [];
    return this.db.getAll(sourceKey)();
  }

  getLookupLabel(sourceKey: string, id: string): string {
    const opts = this.getOptions(sourceKey);
    const found = opts.find(o => o.id === id);
    return found ? found.name : id; // Fallback to ID if not found
  }

  openCreate() {
    this.editingId.set(null);
    this.form.reset({ active_flag: true });
    this.isModalOpen.set(true);
  }

  edit(item: any) {
    this.editingId.set(item.id);
    this.form.patchValue(item);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.form.reset();
  }

  save() {
    if (this.form.valid) {
      const val = this.form.value;
      if (this.editingId()) {
        val.id = this.editingId();
      }
      this.db.save(this.schema().key, val);
      this.closeModal();
    }
  }

  delete(id: string) {
    if(confirm('Are you sure you want to delete this record?')) {
      this.db.delete(this.schema().key, id);
    }
  }
}