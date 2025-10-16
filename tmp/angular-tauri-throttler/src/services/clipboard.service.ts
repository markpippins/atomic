import { Injectable, signal } from '@angular/core';
import { FileSystemNode } from '../models/file-system.model';
import { TauriFileSystemProvider } from '../services/tauri-file-system-provider.service';

export interface ClipboardData {
  operation: 'cut' | 'copy';
  sourceProvider: TauriFileSystemProvider;
  sourcePath: string[];
  items: FileSystemNode[];
}

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  private clipboardData = signal<ClipboardData | null>(null);

  clipboard = this.clipboardData.asReadonly();

  set(data: ClipboardData): void {
    this.clipboardData.set(data);
  }

  get(): ClipboardData | null {
    return this.clipboardData();
  }

  clear(): void {
    this.clipboardData.set(null);
  }
}