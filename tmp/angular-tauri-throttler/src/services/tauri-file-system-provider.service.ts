import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { FileSystemNode, FileType, SearchResultNode } from '../models/file-system.model';

export interface ItemReference {
  name: string;
  type: FileType;
}

@Injectable({
  providedIn: 'root'
})
export class TauriFileSystemProvider {
  async getContents(path: string[]): Promise<FileSystemNode[]> {
    return await invoke<FileSystemNode[]>('get_file_system_contents', { currentPath: path });
  }

  async getFileContent(path: string[], name: string): Promise<string> {
    return await invoke<string>('get_file_content', { currentPath: path, name });
  }

  async getFolderTree(): Promise<FileSystemNode> {
    return await invoke<FileSystemNode>('get_folder_tree');
  }

  async createDirectory(path: string[], name: string): Promise<void> {
    return await invoke('create_directory', { dirPath: path, name });
  }

  async removeDirectory(path: string[], name: string): Promise<void> {
    return await invoke('remove_directory', { dirPath: path, name });
  }

  async createFile(path: string[], name: string): Promise<void> {
    return await invoke('create_file', { dirPath: path, name });
  }

  async deleteFile(path: string[], name: string): Promise<void> {
    return await invoke('delete_file', { dirPath: path, name });
  }

  async rename(path: string[], oldName: string, newName: string): Promise<void> {
    return await invoke('rename_file_or_directory', { dirPath: path, oldName, newName });
  }

  async move(sourcePath: string[], destPath: string[], items: ItemReference[]): Promise<void> {
    return await invoke('move_items', { sourcePath, destPath, items });
  }

  async copy(sourcePath: string[], destPath: string[], items: ItemReference[]): Promise<void> {
    return await invoke('copy_items', { sourcePath, destPath, items });
  }

  async search(query: string): Promise<SearchResultNode[]> {
    return await invoke<SearchResultNode[]>('search_files', { query });
  }
}