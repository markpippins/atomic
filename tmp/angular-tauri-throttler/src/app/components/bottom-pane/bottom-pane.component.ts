import { Component } from '@angular/core';

@Component({
  selector: 'app-bottom-pane',
  standalone: true,
  template: `
    <div class="h-full bg-[rgb(var(--color-surface))] border-t border-[rgb(var(--color-border-base))] p-4">
      <h3 class="font-semibold text-[rgb(var(--color-text-base))] mb-2">Information Panel</h3>
      <p class="text-[rgb(var(--color-text-muted))] text-sm">This is where file details and information will be displayed.</p>
      <div class="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h4 class="text-xs font-medium text-[rgb(var(--color-text-subtle))] uppercase tracking-wider">Properties</h4>
          <ul class="mt-2 space-y-1 text-sm">
            <li><span class="text-[rgb(var(--color-text-muted))]">Type:</span> <span class="text-[rgb(var(--color-text-base))]">Folder</span></li>
            <li><span class="text-[rgb(var(--color-text-muted))]">Size:</span> <span class="text-[rgb(var(--color-text-base))]">1.2 MB</span></li>
            <li><span class="text-[rgb(var(--color-text-muted))]">Modified:</span> <span class="text-[rgb(var(--color-text-base))]">Today</span></li>
          </ul>
        </div>
        <div>
          <h4 class="text-xs font-medium text-[rgb(var(--color-text-subtle))] uppercase tracking-wider">Preview</h4>
          <div class="mt-2 text-sm text-[rgb(var(--color-text-muted))] h-20 flex items-center justify-center bg-[rgb(var(--color-surface-hover-subtle))] rounded">
            Preview area
          </div>
        </div>
      </div>
    </div>
  `,
})
export class BottomPaneComponent {}