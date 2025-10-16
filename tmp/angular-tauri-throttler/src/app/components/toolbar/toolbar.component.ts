import { Component, output, input } from '@angular/core';
import { FileSystemNode } from '../../../models/file-system.model';

export interface SortCriteria {
  key: 'name' | 'modified';
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-toolbar',
  standalone: true,
  template: `
    <div class="h-[45px] px-4 border-b border-[rgb(var(--color-border-base))] flex items-center justify-between flex-shrink-0">
      <div class="flex items-center space-x-1">
        <button 
          (click)="newFolderClick.emit()" 
          [disabled]="!canCreate()" 
          title="New Folder" 
          class="p-2 rounded-md hover:bg-[rgb(var(--color-surface-hover-subtle))] disabled:opacity-50 disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[rgb(var(--color-text-muted))]" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
        <button 
          (click)="newFileClick.emit()" 
          [disabled]="!canCreate()" 
          title="New File" 
          class="p-2 rounded-md hover:bg-[rgb(var(--color-surface-hover-subtle))] disabled:opacity-50 disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[rgb(var(--color-text-muted))]" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
          </svg>
        </button>
        <div class="w-px h-6 bg-[rgb(var(--color-border-base))] mx-1"></div>
        <button 
          (click)="cutClick.emit()" 
          [disabled]="!canCut()" 
          title="Cut" 
          class="p-2 rounded-md hover:bg-[rgb(var(--color-surface-hover-subtle))] disabled:opacity-50 disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[rgb(var(--color-text-muted))]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8.01 14.01A6.5 6.5 0 0013 19a6.49 6.49 0 004.87-2.13A6.49 6.49 0 0019 12a6.5 6.5 0 00-5-5A6.49 6.49 0 009 5.87 1 1 0 007 5.87V5a1 1 0 00-2 0v1a1 1 0 000 2h1a1 1 0 000-2H5a1 1 0 00-1 1v7a1 1 0 001 1h4a1 1 0 000-2H6a1 1 0 000-2h4a1 1 0 000-2 1 1 0 00-1-1z" />
          </svg>
        </button>
        <button 
          (click)="copyClick.emit()" 
          [disabled]="!canCopy()" 
          title="Copy" 
          class="p-2 rounded-md hover:bg-[rgb(var(--color-surface-hover-subtle))] disabled:opacity-50 disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[rgb(var(--color-text-muted))]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
          </svg>
        </button>
        <button 
          (click)="pasteClick.emit()" 
          [disabled]="!canPaste()" 
          title="Paste" 
          class="p-2 rounded-md hover:bg-[rgb(var(--color-surface-hover-subtle))] disabled:opacity-50 disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[rgb(var(--color-text-muted))]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
        </button>
        <div class="w-px h-6 bg-[rgb(var(--color-border-base))] mx-1"></div>
        <button 
          (click)="renameClick.emit()" 
          [disabled]="!canRename()" 
          title="Rename" 
          class="p-2 rounded-md hover:bg-[rgb(var(--color-surface-hover-subtle))] disabled:opacity-50 disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[rgb(var(--color-text-muted))]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button 
          (click)="shareClick.emit()" 
          [disabled]="!canShare()" 
          title="Share" 
          class="p-2 rounded-md hover:bg-[rgb(var(--color-surface-hover-subtle))] disabled:opacity-50 disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[rgb(var(--color-text-muted))]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
        </button>
        <button 
          (click)="deleteClick.emit()" 
          [disabled]="!canDelete()" 
          title="Delete" 
          class="p-2 rounded-md hover:bg-[rgb(var(--color-surface-hover-subtle))] disabled:opacity-50 disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[rgb(var(--color-text-muted))]" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div class="flex items-center space-x-1">
        <button 
          (click)="toggleBottomPane.emit()" 
          [class.text-[rgb(var(--color-accent-text))]]="isBottomPaneVisible()"
          title="Toggle Info Panel" 
          class="p-2 rounded-md hover:bg-[rgb(var(--color-surface-hover-subtle))]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[rgb(var(--color-text-muted))]" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clip-rule="evenodd" />
          </svg>
        </button>
        <div class="w-px h-6 bg-[rgb(var(--color-border-base))] mx-1"></div>
        <div class="relative" [class.hidden]="isSearchView()">
          <button 
            (click)="toggleSortDirection()" 
            title="Sort by {{ currentSort().key === 'name' ? 'Name' : 'Date' }}"
            class="flex items-center px-2 py-1 rounded-md border border-[rgb(var(--color-border-muted))] bg-[rgb(var(--color-background))] hover:bg-[rgb(var(--color-surface-hover-subtle))]">
            <span class="text-sm mr-1">{{ currentSort().key === 'name' ? 'Name' : 'Date' }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[rgb(var(--color-text-muted))]" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <div class="absolute right-0 mt-1 w-48 bg-[rgb(var(--color-surface-dialog))] border border-[rgb(var(--color-border-base))] rounded-md shadow-lg py-1 text-sm text-[rgb(var(--color-text-muted))] z-50 hidden">
            <div class="px-4 py-2 hover:bg-[rgb(var(--color-surface-hover))] cursor-pointer">Sort by name</div>
            <div class="px-4 py-2 hover:bg-[rgb(var(--color-surface-hover))] cursor-pointer">Sort by date</div>
          </div>
        </div>
        <div class="w-px h-6 bg-[rgb(var(--color-border-base))] mx-1" [class.hidden]="isSearchView()"></div>
        <button 
          (click)="searchClick.emit()" 
          [hidden]="isSearchView()" 
          title="Search" 
          class="p-2 rounded-md hover:bg-[rgb(var(--color-surface-hover-subtle))]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[rgb(var(--color-text-muted))]" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </button>
        <button 
          (click)="closeSearchClick.emit()" 
          [hidden]="!isSearchView()" 
          title="Close Search" 
          class="p-2 rounded-md hover:bg-[rgb(var(--color-surface-hover-subtle))]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[rgb(var(--color-text-muted))]" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  `,
})
export class ToolbarComponent {
  // Outputs
  newFolderClick = output<void>();
  newFileClick = output<void>();
  filesUploaded = output<FileList>();
  cutClick = output<void>();
  copyClick = output<void>();
  copyItemsTo = output<string[]>();
  moveItemsTo = output<string[]>();
  pasteClick = output<void>();
  renameClick = output<void>();
  shareClick = output<void>();
  deleteClick = output<void>();
  sortChange = output<SortCriteria>();
  searchClick = output<void>();
  closeSearchClick = output<void>();
  toggleBottomPane = output<void>();

  // Inputs
  canCut = input(false);
  canCopy = input(false);
  canCopyToMoveTo = input(false);
  canPaste = input(false);
  canRename = input(false);
  canShare = input(false);
  canDelete = input(false);
  currentSort = input<SortCriteria>({ key: 'name', direction: 'asc' });
  folderTree = input<FileSystemNode | null>(null);
  isSearchView = input(false);
  isBottomPaneVisible = input(false);

  canCreate = input(true);

  toggleSortDirection(): void {
    const current = this.currentSort();
    const newDirection = current.direction === 'asc' ? 'desc' : 'asc';
    this.sortChange.emit({ ...current, direction: newDirection });
  }
}