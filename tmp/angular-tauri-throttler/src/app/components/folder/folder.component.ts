import { Component, input, output, EventEmitter } from '@angular/core';
import { FileSystemNode } from '../../../models/file-system.model';

@Component({
  selector: 'app-folder',
  standalone: true,
  template: `
    <div 
      class="flex flex-col items-center p-2 rounded-md hover:bg-[rgb(var(--color-accent-bg))] cursor-pointer transition-colors duration-150 group"
      [class.bg-[rgb(var(--color-accent-bg-selected))]]="isSelected()"
      (click)="handleClick($event)"
      (contextmenu)="handleContextMenu($event)"
      (dblclick)="handleDoubleClick($event)">
      @if (iconUrl() && !hasFailedToLoadImage()) {
        <img [src]="iconUrl()" alt="folder" width="64" height="64" class="h-16 w-16 object-contain pointer-events-none" (error)="handleImageError()" />
      } @else {
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-[rgb(var(--color-text-subtle))] pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
      }
      <span class="mt-2 text-center text-xs break-all truncate w-full text-[rgb(var(--color-text-muted))] group-hover:text-[rgb(var(--color-accent-text))] pointer-events-none">{{ item().name }}</span>
    </div>
  `,
})
export class FolderComponent {
  item = input.required<FileSystemNode>();
  iconUrl = input<string | null>(null);
  hasFailedToLoadImage = input(false);
  isSelected = input(false);

  click = output<MouseEvent>();
  dblclick = output<MouseEvent>();
  itemContextMenu = output<{ event: MouseEvent, item: FileSystemNode }>();
  itemDrop = output<{ files: FileList, item: FileSystemNode }>();
  imageError = output<string>();

  handleClick(event: MouseEvent): void {
    this.click.emit(event);
  }

  handleDoubleClick(event: MouseEvent): void {
    this.dblclick.emit(event);
  }

  handleContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.itemContextMenu.emit({ event, item: this.item() });
  }

  handleImageError(): void {
    this.imageError.emit(this.item().name);
  }
}