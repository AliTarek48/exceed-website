// src/app/services/route-localization.service.ts
import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { LanguageService } from './language.service';
import { LanguageGuard } from '../guards/language.guard';

@Injectable({
  providedIn: 'root',
})
export class RouteLocalizationService {
  private defaultLang = 'ar';

  constructor(private languageService: LanguageService) {}

  localizeRoutes(baseRoutes: Routes): Routes {
    const localizedRoutes: Routes = [];
    const supportedLanguages = this.languageService.getSupportedLanguages();

    // Redirect empty path to default language
    localizedRoutes.push({
      path: '',
      redirectTo: this.defaultLang,
      pathMatch: 'full',
    });

    // Create routes for each supported language
    supportedLanguages.forEach((language) => {
      const languageRoutes: Routes = this.createLocalizedRoutes(
        baseRoutes,
        language.code
      );

      localizedRoutes.push({
        path: language.code,
        children: languageRoutes,
        canActivate: [LanguageGuard],
        data: { lang: language.code },
      });
    });

    // Handle unknown routes - redirect to default language home
    localizedRoutes.push({
      path: '**',
      redirectTo: `${this.defaultLang}/home`,
    });

    return localizedRoutes;
  }

  private createLocalizedRoutes(routes: Routes, langCode: string): Routes {
    return routes.map((route) => {
      // Skip the root redirect route in children
      if (route.path === '' && route.redirectTo) {
        return { ...route };
      }

      const localizedRoute = {
        ...route,
        data: {
          ...route.data,
          lang: langCode,
        },
      };

      // Handle children routes recursively
      if (route.children) {
        localizedRoute.children = this.createLocalizedRoutes(
          route.children,
          langCode
        );
      }

      return localizedRoute;
    });
  }

  getLocalizedPath(path: string, langCode?: string): string {
    const currentLang =
      langCode || this.languageService.getCurrentLanguage().code;
    const cleanPath = path.replace(/^\/+|\/+$/g, '');

    // Always include language prefix for all languages
    return `/${currentLang}/${cleanPath}`;
  }

  getCurrentLangFromUrl(url: string): string {
    const segments = url.split('/').filter((segment) => segment);

    // Check if first segment is a supported language
    if (
      segments.length > 0 &&
      this.languageService.isLanguageSupported(segments[0])
    ) {
      return segments[0];
    }

    // If no language in URL, return default
    return this.defaultLang;
  }

  // Helper to get current path without language prefix
  getCurrentPathWithoutLanguage(url: string): string {
    const segments = url.split('/').filter((segment) => segment);

    if (
      segments.length > 0 &&
      this.languageService.isLanguageSupported(segments[0])
    ) {
      return segments.slice(1).join('/') || 'home';
    }

    return segments.join('/') || 'home';
  }
}
