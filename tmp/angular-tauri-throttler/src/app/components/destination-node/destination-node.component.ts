import { Component, input, output } from '@angular/core';
import { FileSystemNode } from '../../../models/file-system.model';

@Component({
  selector: 'app-destination-node',
  standalone: true,
  template: `
    <div 
      class="px-4 py-2 hover:bg-[rgb(var(--color-surface-hover))] cursor-pointer flex items-center"
      (click)="selectDestination()">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-[rgb(var(--color-text-subtle))]" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clip-rule="evenodd" />
        <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
      </svg>
      <span>{{ node().name }}</span>
    </div>
  `,
})
export class DestinationNodeComponent {
  node = input.required<FileSystemNode>();
  path = input.required<string[]>();
  destinationSelected = output<string[]>();

  selectDestination(): void {
    this.destinationSelected.emit([...this.path()]);
  }
}