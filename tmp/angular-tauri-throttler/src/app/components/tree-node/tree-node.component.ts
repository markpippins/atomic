import { Component, input, output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSystemNode } from '../../../models/file-system.model';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <div 
        class="flex items-center py-1 px-2 rounded-md hover:bg-[rgb(var(--color-surface-hover))] cursor-pointer"
        [class.bg-[rgb(var(--color-accent-bg-selected))]]="isCurrentPath()"
        (click)="onNodeClick()">
        <!-- Indentation -->
        @for (i of getIndentSpaces(); track i) {
          <div class="w-4"></div>
        }
        
        <!-- Expand/Collapse Icon -->
        @if (node().type === 'folder' && hasChildren()) {
          <button 
            (click)="toggleExpanded(); $event.stopPropagation()"
            class="mr-1 w-4 h-4 flex items-center justify-center">
            @if (expanded()) {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-[rgb(var(--color-text-subtle))]" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-[rgb(var(--color-text-subtle))]" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            }
          </button>
        } @else if (node().type === 'folder') {
          <div class="mr-1 w-4 h-4 flex items-center justify-center">
            <div class="w-1"></div>
          </div>
        }
        
        <!-- Icon -->
        @if (node().type === 'folder') {
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[rgb(var(--color-text-subtle))]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
        } @else {
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[rgb(var(--color-text-subtle))]" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
          </svg>
        }
        
        <!-- Label -->
        <span class="ml-1 text-sm truncate">{{ node().name }}</span>
      </div>
      
      <!-- Children -->
      @if (expanded() && node().children && node().children!.length > 0) {
        <div class="ml-4 space-y-1">
          @for (child of node().children!; track child.name) {
            <app-tree-node
              [node]="child"
              [currentPath]="currentPath()"
              [imageService]="imageService()"
              [depth]="depth() + 1"
              (pathChange)="pathChange.emit($event)"
              (refreshTree)="refreshTree.emit()"
              (loadChildren)="loadChildren.emit($event)"
              (onToggleExpanded)="onToggleExpanded.emit($event)">
            </app-tree-node>
          }
        </div>
      }
    </div>
  `
})
export class TreeNodeComponent {
  node = input.required<FileSystemNode>();
  currentPath = input.required<string[]>();
  imageService = input.required<ImageService>();
  depth = input.required<number>();
  
  pathChange = output<string[]>();
  refreshTree = output<void>();
  loadChildren = output<string[]>();
  onToggleExpanded = output<string[]>();

  expanded = signal(false);

  getIndentSpaces(): number[] {
    return Array(this.depth()).fill(0).map((_, i) => i);
  }

  hasChildren(): boolean {
    return this.node().children !== undefined && 
           this.node().children!.length > 0;
  }

  isCurrentPath(): boolean {
    // Check if this node's path matches the current path
    const nodePath = this.buildPath();
    return this.currentPath().length === nodePath.length && 
           this.currentPath().every((val, idx) => val === nodePath[idx]);
  }

  buildPath(): string[] {
    // This is a simplified version - in reality, you'd need to track the path up the tree
    // For now, we'll just return the node name as an array
    return [this.node().name]; 
  }

  onNodeClick(): void {
    const path = this.buildPath();
    this.pathChange.emit(path);
  }

  toggleExpanded(): void {
    this.expanded.update(v => !v);
    if (this.expanded()) {
      this.onToggleExpanded.emit(this.buildPath());
    }
  }
}