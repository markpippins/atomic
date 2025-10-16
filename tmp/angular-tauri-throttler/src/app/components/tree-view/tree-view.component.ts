import { Component, input, output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSystemNode } from '../../../models/file-system.model';
import { ImageService } from '../../../services/image.service';
import { TreeNodeComponent } from '../tree-node/tree-node.component';

@Component({
  selector: 'app-tree-view',
  standalone: true,
  template: `
    <div class="space-y-1">
      <app-tree-node
        [node]="node()!"
        [currentPath]="currentPath()"
        [imageService]="imageService()!"
        [depth]="0"
        (pathChange)="pathChange.emit($event)"
        (refreshTree)="refreshTree.emit()"
        (loadChildren)="loadChildren.emit($event)"
        (onToggleExpanded)="onToggleExpanded.emit($event)">
      </app-tree-node>
    </div>
  `,
  imports: [CommonModule, TreeNodeComponent]
})
export class TreeViewComponent {
  node = input.required<FileSystemNode>();
  currentPath = input.required<string[]>();
  imageService = input.required<ImageService>();
  
  pathChange = output<string[]>();
  refreshTree = output<void>();
  loadChildren = output<string[]>();
  onToggleExpanded = output<string[]>();

  toggleExpanded(path: string[]): void {
    // The actual logic would be in the tree node, but we emit it up
    this.loadChildren.emit(path);
  }
}