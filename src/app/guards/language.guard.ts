// src/app/guards/language.guard.ts
import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageGuard implements CanActivate {
  private languageService = inject(LanguageService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    debugger;
    // Get the language code from the first URL segment
    const urlSegments = route.url.map((segment) => segment.path);
    const langCode = urlSegments[0]; // First segment is the language code

    if (langCode && this.languageService.isLanguageSupported(langCode)) {
      this.languageService.setLanguage(langCode);
      return true;
    }

    // Redirect to default language if invalid language code
    const defaultLang = this.languageService.getCurrentLanguage().code;
    this.router.navigate([defaultLang]);
    return false;
  }
}
