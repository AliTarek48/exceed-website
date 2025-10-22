// count-up.directive.ts
import {
  Directive,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnChanges {
  @Input() appCountUp!: number;
  @Input() duration: number = 2000;
  @Input() trigger: boolean = false;

  private animationFrameId: number | null = null;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['trigger'] &&
      changes['trigger'].currentValue &&
      isPlatformBrowser(this.platformId)
    ) {
      this.animateCount();
    }
  }

  private animateCount() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    const startValue = 0;
    const endValue = this.appCountUp;
    const duration = this.duration;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(
        easeOutQuart * (endValue - startValue) + startValue
      );

      this.el.nativeElement.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.el.nativeElement.textContent = endValue.toLocaleString();
        this.el.nativeElement.classList.add('counter-animated');
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
