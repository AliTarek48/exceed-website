// services/navbar.service.ts
import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private hasBackgroundSignal = signal<boolean>(false);

  readonly hasBackground = computed(() => this.hasBackgroundSignal());

  setBackground(hasBackground: boolean): void {
    this.hasBackgroundSignal.set(hasBackground);
  }
}
