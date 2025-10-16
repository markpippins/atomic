import { Component, input } from '@angular/core';
import { SearchResultNode } from '../../../models/file-system.model';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  template: `
    <div class="p-4">
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-[rgb(var(--color-text-base))]">Search Results</h3>
      </div>
      <div class="space-y-2">
        @for (result of results(); track result.name) {
          <div class="flex items-center p-2 rounded-md hover:bg-[rgb(var(--color-accent-bg))] cursor-pointer">
            @if (result.type === 'folder') {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[rgb(var(--color-text-subtle))]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[rgb(var(--color-text-subtle))]" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
              </svg>
            }
            <div class="ml-3">
              <p class="text-[rgb(var(--color-text-base))]">{{ result.name }}</p>
              <p class="text-xs text-[rgb(var(--color-text-subtle))]">{{ result.path.join('/') }}</p>
            </div>
          </div>
        } @empty {
          <div class="text-center py-8 text-[rgb(var(--color-text-muted))]">
            <p>No results found.</p>
          </div>
        }
      </div>
    </div>
  `,
})
export class SearchResultsComponent {
  results = input.required<SearchResultNode[]>();
  imageService = input.required<ImageService>();
}