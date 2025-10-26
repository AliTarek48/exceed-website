import {
  Component,
  inject,
  OnInit,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {
  TranslateModule,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { LanguageService } from './services/language.service';
import { RouteLocalizationService } from './services/route-localization.service';
import { routes } from './app.routes';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { EnhancedLoadingService } from './services/loading.service';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    AsyncPipe,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'exceed-website';

  private router = inject(Router);
  private languageService = inject(LanguageService);
  private routeLocalizationService = inject(RouteLocalizationService);
  private platformId = inject(PLATFORM_ID);

  // Services
  loadingService = inject(EnhancedLoadingService);
  private navbarService = inject(NavbarService);

  // Component state
  isRTL = true;
  currentLanguage = 'ar';
  supportedLanguages = this.languageService.getSupportedLanguages();
  isLoading$ = this.loadingService.loading$;

  // Scroll to top functionality
  showScrollTop = false;
  private scrollThreshold = 300;
  private isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit() {
    this.loadingService.initialize();

    // Initialize routes
    const localizedRoutes =
      this.routeLocalizationService.localizeRoutes(routes);
    this.router.resetConfig(localizedRoutes);

    // Subscribe to language changes with null safety
    this.languageService.currentLanguage$.subscribe((language) => {
      if (language) {
        this.currentLanguage = language.code;
        this.isRTL = language.direction === 'rtl';
      }
    });

    // Handle route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.updateLanguageFromUrl();
        this.updateNavbarBackground();
      });

    this.updateLanguageFromUrl();

    // Initialize scroll position check (browser only)
    if (this.isBrowser) {
      this.checkScrollPosition();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser) {
      this.checkScrollPosition();
    }
  }

  private checkScrollPosition() {
    if (!this.isBrowser) return;

    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.showScrollTop = scrollPosition > this.scrollThreshold;
  }

  scrollToTop() {
    if (!this.isBrowser) return;

    // Smooth scroll with fallback
    if ('scrollBehavior' in document.documentElement.style) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      // Fallback for older browsers
      window.scrollTo(0, 0);
    }
  }

  private updateLanguageFromUrl(): void {
    const urlLang = this.routeLocalizationService.getCurrentLangFromUrl(
      this.router.url
    );
    if (urlLang && urlLang !== this.currentLanguage) {
      this.languageService.setLanguage(urlLang);
    }
  }

  private updateNavbarBackground(): void {
    let route = this.router.routerState.root;

    // Traverse through all child routes to find the data
    while (route.firstChild) {
      route = route.firstChild;
    }

    const hasBackground = route.snapshot.data['navbarBackground'] || false;
    this.navbarService.setBackground(hasBackground);
  }
}
