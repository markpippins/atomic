export interface FileSystemNode {
  name: string;
  type: FileType;
  modified: string;
  children?: FileSystemNode[];
  childrenLoaded?: boolean;
  content?: string;
}

export type FileType = 'folder' | 'file';

export interface SearchResultNode extends FileSystemNode {
  path: string[];
}