import { Injectable, inject } from '@angular/core';
import { FileSystemNode } from '../models/file-system.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  getIconUrl(item: FileSystemNode): string | null {
    // For now, return a default icon based on the file type
    if (item.type === 'folder') {
      // In a real implementation, this would return a URL to a folder icon
      return null;
    } else {
      // For files, determine icon based on extension
      const extension = this.getFileExtension(item.name);
      if (extension) {
        // In a real implementation, this would return a URL to the appropriate file type icon
        return null;
      }
      return null;
    }
  }

  private getFileExtension(filename: string): string | null {
    const lastDot = filename.lastIndexOf('.');
    if (lastDot === -1 || lastDot === 0) {
      return null;
    }
    return filename.substring(lastDot + 1);
  }
}