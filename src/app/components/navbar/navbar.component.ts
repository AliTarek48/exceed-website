import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  afterNextRender,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { RouteLocalizationService } from '../../services/route-localization.service';
import { filter } from 'rxjs';
import { NavbarService } from '../../services/navbar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslatePipe, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('navElement') navElement!: ElementRef<HTMLElement>;

  languageService = inject(LanguageService);
  private router = inject(Router);
  private routeLocalizationService = inject(RouteLocalizationService);
  readonly navbarService = inject(NavbarService);
  activeRoute: string = '';

  currentLanguage = 'ar';
  private scrollListener: (() => void) | null = null;

  constructor() {
    // Use afterNextRender for browser-only code
    afterNextRender(() => {
      this.setupScrollListener();
    });
  }

  ngOnInit() {
    // Subscribe to language changes
    this.languageService.currentLanguage$.subscribe((language) => {
      this.currentLanguage = language.code;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeRoute = event.urlAfterRedirects;
      });
  }

  ngOnDestroy() {
    this.removeScrollListener();
  }

  switchLanguage(langCode: string): void {
    if (langCode !== this.currentLanguage) {
      const currentPath =
        this.routeLocalizationService.getCurrentPathWithoutLanguage(
          this.router.url
        );
      const newPath = this.routeLocalizationService.getLocalizedPath(
        currentPath,
        langCode
      );
      this.router.navigateByUrl(newPath);
    }
  }

  getLocalizedPath(path: string): string {
    return this.routeLocalizationService.getLocalizedPath(path);
  }

  isActive(route: string): boolean {
    return this.activeRoute.includes(route);
  }

  private setupScrollListener(): void {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;

    this.scrollListener = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.scrollListener, { passive: true });

    // Initial check
    this.handleScroll();
  }

  private removeScrollListener(): void {
    if (this.scrollListener && typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private handleScroll(): void {
    if (typeof window === 'undefined') return;

    const scrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;

    // Add background when scrolled past 100vh
    if (scrollY > viewportHeight) {
      console.log('YES');
      this.navElement.nativeElement.classList.add('scrolled');
      // this.navElement.nativeElement.classList.add('navbar-with-bg');
    } else {
      this.navElement.nativeElement.classList.remove('scrolled');
      // this.navElement.nativeElement.classList.remove('navbar-with-bg');
    }
  }
}
