import { Component, input, output, EventEmitter } from '@angular/core';
import { FileSystemNode } from '../../../models/file-system.model';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-properties-dialog',
  standalone: true,
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" (click)="close.emit()">
      <div class="bg-[rgb(var(--color-surface-dialog))] rounded-lg shadow-xl w-full max-w-md" (click)="$event.stopPropagation()">
        <div class="p-4 border-b border-[rgb(var(--color-border-base))]">
          <h3 class="text-lg font-semibold text-[rgb(var(--color-text-base))]">Properties</h3>
        </div>
        <div class="p-6">
          <div class="flex items-center mb-4">
            @if (item().type === 'folder') {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-[rgb(var(--color-text-subtle))]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-[rgb(var(--color-text-subtle))]" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
              </svg>
            }
            <div class="ml-4">
              <h4 class="text-lg font-medium text-[rgb(var(--color-text-base))]">{{ item().name }}</h4>
              <p class="text-[rgb(var(--color-text-subtle))] text-sm">{{ item().type }}</p>
            </div>
          </div>
          
          <div class="space-y-3">
            <div>
              <p class="text-sm text-[rgb(var(--color-text-subtle))]">Location</p>
              <p class="text-[rgb(var(--color-text-base))]">/path/to/folder</p>
            </div>
            <div>
              <p class="text-sm text-[rgb(var(--color-text-subtle))]">Type</p>
              <p class="text-[rgb(var(--color-text-base))]">{{ item().type }}</p>
            </div>
            <div>
              <p class="text-sm text-[rgb(var(--color-text-subtle))]">Size</p>
              <p class="text-[rgb(var(--color-text-base))]">1.2 MB</p>
            </div>
            <div>
              <p class="text-sm text-[rgb(var(--color-text-subtle))]">Last Modified</p>
              <p class="text-[rgb(var(--color-text-base))]">{{ item().modified }}</p>
            </div>
            <div>
              <p class="text-sm text-[rgb(var(--color-text-subtle))]">Permissions</p>
              <p class="text-[rgb(var(--color-text-base))]">Read & Write</p>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 bg-[rgb(var(--color-surface-muted))] flex justify-end rounded-b-lg">
          <button (click)="close.emit()" class="px-4 py-2 bg-[rgb(var(--color-accent-solid-bg))] text-[rgb(var(--color-text-inverted))] rounded-md hover:bg-[rgb(var(--color-accent-solid-bg-hover))] transition-colors font-semibold text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  `,
})
export class PropertiesDialogComponent {
  item = input.required<FileSystemNode>();
  imageService = input.required<ImageService>();
  close = output<void>();
}