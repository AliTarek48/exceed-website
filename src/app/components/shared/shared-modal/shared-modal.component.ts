import { Component, input, output, model, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-modal.component.html',
  styleUrl: './shared-modal.component.scss',
})
export class SharedModalComponent {
  // Using model for two-way binding
  showModal = model<boolean>(false);

  // Using input for other properties
  title = input<string>('');
  modalId = input<string>('defaultModal');
  showCloseButton = input<boolean>(true);
  modalSize = input<'sm' | 'lg' | 'xl' | ''>('');
  slideFromBottom = input<boolean>(true);

  // Using output for events
  modalClosed = output<void>();
  modalOpened = output<void>();

  // Signal for animation state
  isAnimating = false;

  constructor() {
    // Watch for showModal changes to trigger animations
    effect(() => {
      if (this.showModal()) {
        this.openModal();
      } else {
        this.closeModal();
      }
    });
  }

  private openModal() {
    this.isAnimating = true;
    this.modalOpened.emit();

    // Force reflow to ensure animation
    setTimeout(() => {
      this.isAnimating = true;
    }, 10);
  }

  private closeModal() {
    this.isAnimating = false;

    // Wait for close animation before emitting
    setTimeout(() => {
      this.modalClosed.emit();
    }, 300);
  }

  close() {
    this.showModal.set(false);
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }
}
