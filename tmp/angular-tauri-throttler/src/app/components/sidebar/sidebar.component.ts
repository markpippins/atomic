import { Component, input, output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSystemNode } from '../../../models/file-system.model';
import { ImageService } from '../../../services/image.service';
import { TreeViewComponent } from '../tree-view/tree-view.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
    <div class="w-64 border-r border-[rgb(var(--color-border-base))] bg-[rgb(var(--color-surface))] flex flex-col h-full">
      <div class="p-3 border-b border-[rgb(var(--color-border-base))]">
        <h3 class="font-semibold text-[rgb(var(--color-text-base))]">Navigation</h3>
      </div>
      <div class="flex-1 overflow-y-auto p-2">
        @if (folderTree()) {
          <app-tree-view
            [node]="folderTree()!"
            [currentPath]="currentPath()"
            [imageService]="imageService()"
            (pathChange)="pathChange.emit($event)"
            (refreshTree)="refreshTree.emit()"
            (loadChildren)="loadChildren.emit($event)">
          </app-tree-view>
        }
      </div>
      <div class="p-2 border-t border-[rgb(var(--color-border-base))]">
        <button 
          (click)="refreshTree.emit()"
          class="w-full py-1.5 px-3 text-sm bg-[rgb(var(--color-surface))] hover:bg-[rgb(var(--color-surface-hover))] rounded-md border border-[rgb(var(--color-border-muted))] text-[rgb(var(--color-text-muted))] transition-colors">
          <div class="flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm10.899 12.101A7.002 7.002 0 012.399 8.567a1 1 0 011.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101z" clip-rule="evenodd" />
            </svg>
            <span>Refresh</span>
          </div>
        </button>
      </div>
    </div>
  `,
  imports: [CommonModule, TreeViewComponent]
})
export class SidebarComponent {
  folderTree = input<FileSystemNode | null>(null);
  currentPath = input.required<string[]>();
  imageService = input.required<ImageService>();
  
  pathChange = output<string[]>();
  refreshTree = output<void>();
  loadChildren = output<string[]>();
}