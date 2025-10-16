import { Component, input, output } from '@angular/core';
import { FileSystemNode } from '../../../models/file-system.model';
import { ImageService } from '../../../services/image.service';
import { TauriFileSystemProvider } from '../../../services/tauri-file-system-provider.service';

@Component({
  selector: 'app-detail-pane',
  standalone: true,
  template: `
    <div class="w-80 border-l border-[rgb(var(--color-border-base))] bg-[rgb(var(--color-surface))] flex flex-col">
      <div class="p-3 border-b border-[rgb(var(--color-border-base))] flex justify-between items-center">
        <h3 class="font-semibold">Details</h3>
        <button (click)="close.emit()" class="p-1 rounded-md hover:bg-[rgb(var(--color-surface-hover))]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[rgb(var(--color-text-muted))]" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div class="p-4 flex-1 overflow-y-auto">
        @if (item()) {
          <div>
            <div class="flex items-center mb-4">
              @if (item()!.type === 'folder') {
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-[rgb(var(--color-text-subtle))]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-[rgb(var(--color-text-subtle))]" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                </svg>
              }
              <div class="ml-4">
                <h4 class="text-lg font-medium text-[rgb(var(--color-text-base))] truncate max-w-[150px]">{{ item()!.name }}</h4>
                <p class="text-[rgb(var(--color-text-subtle))] text-sm capitalize">{{ item()!.type }}</p>
              </div>
            </div>
            
            <div class="space-y-3">
              <div>
                <p class="text-xs text-[rgb(var(--color-text-subtle))] uppercase tracking-wider mb-1">Properties</p>
                <div class="space-y-2">
                  <div>
                    <p class="text-xs text-[rgb(var(--color-text-subtle))]">Type</p>
                    <p class="text-[rgb(var(--color-text-base))] capitalize">{{ item()!.type }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-[rgb(var(--color-text-subtle))]">Size</p>
                    <p class="text-[rgb(var(--color-text-base))]">1.2 MB</p>
                  </div>
                  <div>
                    <p class="text-xs text-[rgb(var(--color-text-subtle))]">Last Modified</p>
                    <p class="text-[rgb(var(--color-text-base))]">{{ item()!.modified }}</p>
                  </div>
                </div>
              </div>
              
              @if (item()!.type === 'file') {
                <div>
                  <p class="text-xs text-[rgb(var(--color-text-subtle))] uppercase tracking-wider mb-1">Preview</p>
                  <div class="text-sm text-[rgb(var(--color-text-muted))] h-32 flex items-center justify-center bg-[rgb(var(--color-surface-hover-subtle))] rounded">
                    File preview would go here
                  </div>
                </div>
              }
            </div>
          </div>
        } @else {
          <p class="text-[rgb(var(--color-text-subtle))]">Select an item to see details</p>
        }
      </div>
    </div>
  `,
})
export class DetailPaneComponent {
  item = input<FileSystemNode | null>(null);
  imageService = input.required<ImageService>();
  fileSystemProvider = input.required<TauriFileSystemProvider>();
  providerPath = input.required<string[]>();
  close = output<void>();
}