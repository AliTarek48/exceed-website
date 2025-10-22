// src/app/services/direction.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Direction = 'ltr' | 'rtl';

@Injectable({
  providedIn: 'root',
})
export class DirectionService {
  private currentDirection = new BehaviorSubject<Direction>('rtl');
  public currentDirection$ = this.currentDirection.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  setDirection(direction: Direction): void {
    this.currentDirection.next(direction);

    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('dir', direction);
      document.body.classList.remove('ltr', 'rtl');
      document.body.classList.add(direction);
    }
  }

  getCurrentDirection(): Direction {
    return this.currentDirection.value;
  }
}
