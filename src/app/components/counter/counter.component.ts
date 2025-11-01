import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CountUpDirective } from '../../directives/counter.directive';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, TranslateModule, CountUpDirective],
  template: `
    <section class="counter-sec section-top-space" #counterSection>
      <div class="counter-sec-container">
        <ul
          class="counter-content d-flex align-items-center justify-content-between"
        >
          <li>
            <span>+</span>
            <span
              [appCountUp]="1000"
              [duration]="2000"
              [trigger]="isVisible"
              class="counter-number"
              >1000</span
            >
            <p class="m-0">{{ 'Project' | translate }}</p>
          </li>
          <li>
            <span>+</span>
            <span
              [appCountUp]="25000"
              [duration]="2000"
              [trigger]="isVisible"
              class="counter-number"
              >25000</span
            >
            <p class="m-0">{{ 'SatisfiedClient' | translate }}</p>
          </li>
          <li>
            <span>+</span>
            <span
              [appCountUp]="100000"
              [duration]="2000"
              [trigger]="isVisible"
              class="counter-number"
              >100000</span
            >
            <p class="m-0">{{ 'MonthlyUser' | translate }}</p>
          </li>
          <li>
            <span>+</span>
            <span
              [appCountUp]="5000000"
              [duration]="2000"
              [trigger]="isVisible"
              class="counter-number"
              >5000000</span
            >
            <p class="m-0">{{ 'MonthlyAccountingTransaction' | translate }}</p>
          </li>
        </ul>
      </div>
    </section>
  `,
  styleUrl: './counter.component.scss',
})
export class CounterComponent implements OnInit, AfterViewInit, OnDestroy {
  isVisible = false;
  private observer: IntersectionObserver | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      this.isVisible = true;
      return;
    }

    // Reset counter on language change
    this.subscriptions.add(
      this.translate.onLangChange.subscribe(() => {
        this.resetCounter();
      })
    );

    // Reset counter on route changes (when coming back to page with counter)
    this.subscriptions.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          // Small delay to ensure component is in view
          setTimeout(() => {
            this.resetCounter();
          }, 100);
        })
    );
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  private setupIntersectionObserver() {
    if (typeof IntersectionObserver === 'undefined') {
      setTimeout(() => {
        this.isVisible = true;
      }, 500);
      return;
    }

    // Clean up existing observer
    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            // Don't disconnect so it can trigger again on re-entry
          } else {
            // Reset when leaving viewport to allow re-triggering
            this.isVisible = false;
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '50px',
      }
    );

    const element = document.querySelector('.counter-sec');
    if (element) {
      this.observer.observe(element);
    } else {
      setTimeout(() => {
        this.isVisible = true;
      }, 1000);
    }
  }

  private resetCounter() {
    // Reset visibility to trigger counter restart
    this.isVisible = false;

    // Small delay to ensure DOM update
    setTimeout(() => {
      // Check if element is in viewport before setting to true
      const element = document.querySelector('.counter-sec');
      if (element && this.isElementInViewport(element)) {
        this.isVisible = true;
      } else {
        // If not in viewport, the intersection observer will trigger it
        this.setupIntersectionObserver();
      }
    }, 50);
  }

  private isElementInViewport(el: Element): boolean {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.subscriptions.unsubscribe();
  }
}
