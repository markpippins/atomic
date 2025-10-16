import { Component, ChangeDetectionStrategy, signal, computed, inject, effect, Renderer2, ElementRef, OnDestroy, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileExplorerComponent, SearchResultNode } from './components/file-explorer/file-explorer.component';
import { TauriFileSystemProvider } from '../services/tauri-file-system-provider.service';
import { FileSystemNode } from '../models/file-system.model';
import { ImageService } from '../services/image.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DetailPaneComponent } from './components/detail-pane/detail-pane.component';

interface PanePath {
  id: number;
  path: string[];
}
type Theme = 'theme-light' | 'theme-steel' | 'theme-dark';
type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

const THEME_STORAGE_KEY = 'file-explorer-theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FileExplorerComponent, SidebarComponent, DetailPaneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)',
  }
})
export class AppComponent implements OnInit, OnDestroy {
  private tauriFsProvider = inject(TauriFileSystemProvider);
  imageService = inject(ImageService);
  private injector = inject(Injector);
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  // --- State Management ---
  isSplitView = signal(false);
  activePaneId = signal(1);
  folderTree = signal<FileSystemNode | null>(null);
  isDetailPaneOpen = signal(false);
  selectedDetailItem = signal<FileSystemNode | null>(null);
  isThemeDropdownOpen = signal(false);
  
  // Keep track of each pane's path
  private panePaths = signal<PanePath[]>([{ id: 1, path: [] }]);

  // --- Search State ---
  isSearchDialogOpen = signal(false);
  private searchInitiatorPaneId = signal<number | null>(null);
  searchResultForPane = signal<{ id: number; results: SearchResultNode[] } | null>(null);

  // --- Theme Management ---
  currentTheme = signal<Theme>('theme-steel');
  themes: {id: Theme, name: string}[] = [
    { id: 'theme-light', name: 'Light' },
    { id: 'theme-steel', name: 'Steel' },
    { id: 'theme-dark', name: 'Dark' },
  ];

  // The sidebar's currentPath is always bound to the path of the active pane
  activePanePath = computed(() => {
    const activeId = this.activePaneId();
    const activePane = this.panePaths().find(p => p.id === activeId);
    return activePane ? activePane.path : [];
  });
  
  // Computed paths for each pane to pass as inputs
  pane1Path = computed(() => this.panePaths().find(p => p.id === 1)?.path ?? []);
  pane2Path = computed(() => this.panePaths().find(p => p.id === 2)?.path ?? []);

  // --- Computed Per-Pane Services ---
  pane1Provider = computed(() => this.tauriFsProvider);
  pane2Provider = computed(() => this.tauriFsProvider);
  pane1ImageService = computed(() => this.imageService);
  pane2ImageService = computed(() => this.imageService);
  
  activeProvider = computed(() => {
    return this.tauriFsProvider;
  });

  activeProviderPath = computed(() => {
    const path = this.activePanePath();
    // The path for the provider needs to be relative (without the root server name)
    return path.length > 0 ? path.slice(1) : [];
  });

  constructor() {
    this.loadTheme();

    effect(() => {
      const theme = this.currentTheme();
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      document.body.className = theme;
    });
  }
  
  ngOnInit(): void {
    this.loadFolderTree();
  }

  ngOnDestroy(): void {
    document.body.className = '';
  }

  loadTheme(): void {
    try {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
      if (storedTheme && this.themes.some(t => t.id === storedTheme)) {
        this.currentTheme.set(storedTheme);
      } else {
        this.currentTheme.set('theme-steel');
      }
    } catch (e) {
      console.error('Failed to load theme from localStorage', e);
      this.currentTheme.set('theme-steel');
    }
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    this.isThemeDropdownOpen.set(false);
  }

  toggleThemeDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.isThemeDropdownOpen.update(v => !v);
  }

  onDocumentClick(event: Event): void {
    const dropdownElement = this.elementRef.nativeElement.querySelector('.relative.inline-block');
    if (dropdownElement && !dropdownElement.contains(event.target)) {
        if (this.isThemeDropdownOpen()) {
            this.isThemeDropdownOpen.set(false);
        }
    }
  }

  async loadFolderTree(): Promise<void> {
    this.folderTree.set(null); // Clear old tree immediately
    
    try {
      const homeRoot = await this.tauriFsProvider.getFolderTree();
      this.folderTree.set(homeRoot);
    } catch (e) {
      console.error('Failed to load a complete folder tree', e);
    }
  }
  
  // --- UI & Pane Management ---
  toggleSplitView(): void {
    this.isSplitView.update(isSplit => {
      if (isSplit) {
        this.panePaths.update(paths => paths.slice(0, 1));
        this.activePaneId.set(1);
        return false;
      } else {
        const currentPath = this.panePaths()[0]?.path ?? [];
        this.panePaths.update(paths => [...paths, { id: 2, path: currentPath }]);
        this.activePaneId.set(2);
        return true;
      }
    });
  }

  toggleDetailPane(): void {
    this.isDetailPaneOpen.update(v => !v);
  }

  onItemSelectedInPane(item: FileSystemNode | null): void {
    this.selectedDetailItem.set(item);
  }

  setActivePane(id: number): void {
    this.activePaneId.set(id);
  }
  
  onPane1PathChanged(path: string[]): void {
    this.updatePanePath(1, path);
  }

  onPane2PathChanged(path: string[]): void {
    this.updatePanePath(2, path);
  }

  private updatePanePath(id: number, path: string[]): void {
    this.panePaths.update(paths => {
      const index = paths.findIndex(p => p.id === id);
      if (index > -1) {
        const newPaths = [...paths];
        newPaths[index] = { ...newPaths[index], path: path };
        return newPaths;
      }
      return paths;
    });
  }
  
  onSidebarNavigation(path: string[]): void {
    this.updatePanePath(this.activePaneId(), path);
  }

  onLoadChildren(path: string[]): void {
    // For now, just refresh the tree
    this.loadFolderTree();
  }

  // --- Search Handling ---
  openSearchDialog(paneId: number): void {
    this.searchInitiatorPaneId.set(paneId);
    this.isSearchDialogOpen.set(true);
  }

  closeSearchDialog(): void {
    this.isSearchDialogOpen.set(false);
    this.searchInitiatorPaneId.set(null);
  }

  executeQuickSearch(paneId: number, query: string): void {
    this.searchInitiatorPaneId.set(paneId);
    this.executeSearch(query);
  }

  async executeSearch(query: string): Promise<void> {
    const paneId = this.searchInitiatorPaneId();
    if (!query || !paneId) {
      this.closeSearchDialog();
      return;
    }

    const path = paneId === 1 ? this.pane1Path() : this.pane2Path();
    const provider = this.tauriFsProvider;

    try {
      const results = await provider.search(query);
      
      const processedResults = results.map(r => ({
        ...r,
        path: r.path // Update path as needed
      }));

      this.searchResultForPane.set({ id: paneId, results: processedResults });
    } catch (e) {
      console.error('Search failed', e);
      alert(`Search failed: ${(e as Error).message}`);
    } finally {
      this.closeSearchDialog();
    }
  }

  onSearchCompleted(): void {
    this.searchResultForPane.set(null);
  }
}
