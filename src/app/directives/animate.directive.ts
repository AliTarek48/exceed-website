// animate-on-scroll.directive.ts
import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  NgZone,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true,
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  @Input() animationClass: string = 'animate__fadeInUp';
  @Input() threshold: number = 0.2;
  @Input() rootMargin: string = '0px 0px -50px 0px';
  @Input() animationDelay: any = 0;
  @Input() delay: number = 0;

  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;

  constructor(
    private el: ElementRef,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  private setupIntersectionObserver() {
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.hasAnimated) {
              this.ngZone.run(() => {
                this.triggerAnimation();
              });
            }
          });
        },
        {
          threshold: +this.threshold,
          rootMargin: this.rootMargin,
        }
      );

      this.observer.observe(this.el.nativeElement);
    });
  }

  private triggerAnimation() {
    const element = this.el.nativeElement;
    const delay = +this.animationDelay || this.delay;

    if (delay > 0) {
      element.style.animationDelay = `${delay}ms`;
    }

    element.classList.add('animate__animated', this.animationClass);

    this.hasAnimated = true;

    if (this.observer) {
      this.observer.unobserve(element);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
