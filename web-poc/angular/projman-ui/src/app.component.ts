import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from './services/gemini.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private geminiService = inject(GeminiService);

  userInput = signal('');
  messages = signal<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hello! I am your Gemini-powered Angular assistant. How can I help you today?' }
  ]);
  isLoading = signal(false);

  async sendMessage() {
    const text = this.userInput().trim();
    if (!text || this.isLoading()) return;

    // Add user message
    this.messages.update(msgs => [...msgs, { role: 'user', text }]);
    this.userInput.set('');
    this.isLoading.set(true);

    try {
      const response = await this.geminiService.generateText(text);
      this.messages.update(msgs => [...msgs, { role: 'ai', text: response }]);
    } catch (err) {
      this.messages.update(msgs => [...msgs, { role: 'ai', text: 'An error occurred.' }]);
    } finally {
      this.isLoading.set(false);
    }
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}