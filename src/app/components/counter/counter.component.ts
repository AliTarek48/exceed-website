// counter.component.ts
import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CountUpDirective } from '../../directives/counter.directive';

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
              >{{ isVisible ? '1000' : '0' }}</span
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
              >{{ isVisible ? '25000' : '0' }}</span
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
              >{{ isVisible ? '100000' : '0' }}</span
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
              >{{ isVisible ? '5000000' : '0' }}</span
            >
            <p class="m-0">{{ 'MonthlyAccountingTransaction' | translate }}</p>
          </li>
        </ul>
      </div>
    </section>
  `,
  styleUrl: './counter.component.scss',
})
export class CounterComponent implements OnInit, AfterViewInit {
  isVisible = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      this.isVisible = true;
    }
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            observer.disconnect();
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
      observer.observe(element);
    } else {
      setTimeout(() => {
        this.isVisible = true;
      }, 1000);
    }
  }
}
