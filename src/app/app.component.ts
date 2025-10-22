import { Component, inject, OnInit } from '@angular/core';
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
import { AsyncPipe } from '@angular/common';

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

  isRTL = true;
  currentLanguage = 'ar';
  supportedLanguages = this.languageService.getSupportedLanguages();
  loadingService = inject(EnhancedLoadingService);
  isLoading$ = this.loadingService.loading$;
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
      .subscribe(() => {
        this.updateLanguageFromUrl();
      });

    this.updateLanguageFromUrl();
  }

  private updateLanguageFromUrl(): void {
    const urlLang = this.routeLocalizationService.getCurrentLangFromUrl(
      this.router.url
    );
    if (urlLang && urlLang !== this.currentLanguage) {
      this.languageService.setLanguage(urlLang);
    }
  }

  // switchLanguage(langCode: string): void {
  //   if (langCode !== this.currentLanguage) {
  //     const currentPath =
  //       this.routeLocalizationService.getCurrentPathWithoutLanguage(
  //         this.router.url
  //       );
  //     const newPath = this.routeLocalizationService.getLocalizedPath(
  //       currentPath,
  //       langCode
  //     );
  //     this.router.navigateByUrl(newPath);
  //   }
  // }

  // getLocalizedPath(path: string): string {
  //   return this.routeLocalizationService.getLocalizedPath(path);
  // }
}
