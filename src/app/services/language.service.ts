// // src/app/services/language.service.ts
// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { BehaviorSubject } from 'rxjs';
// import { DirectionService, Direction } from './direction.service';

// export interface Language {
//   code: string;
//   name: string;
//   direction: Direction;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class LanguageService {
//   private currentLanguage = new BehaviorSubject<Language>(
//     this.getDefaultLanguage()
//   );
//   public currentLanguage$ = this.currentLanguage.asObservable();

//   private readonly supportedLanguages: Language[] = [
//     { code: 'en', name: 'English', direction: 'ltr' },
//     { code: 'ar', name: 'العربية', direction: 'rtl' },
//   ];

//   private readonly defaultLanguageCode = 'ar'; // Set Arabic as default

//   constructor(
//     private directionService: DirectionService,
//     @Inject(PLATFORM_ID) private platformId: any
//   ) {
//     // Initialize language after service construction
//     setTimeout(() => this.initializeLanguage());
//   }

//   private initializeLanguage(): void {
//     if (isPlatformBrowser(this.platformId)) {
//       // Try to get language from URL first
//       const urlLang = this.getLanguageFromUrl();
//       if (urlLang) {
//         this.setLanguage(urlLang);
//         return;
//       }

//       // Try to get from browser settings
//       const browserLang = this.getBrowserLanguage();
//       if (browserLang && this.isLanguageSupported(browserLang)) {
//         this.setLanguage(browserLang);
//         return;
//       }
//     }

//     // Fallback to default language
//     this.setLanguage(this.defaultLanguageCode);
//   }

//   private getDefaultLanguage(): Language {
//     // Safe way to get default language
//     const defaultLang = this.supportedLanguages?.find(
//       (lang) => lang.code === this.defaultLanguageCode
//     );
//     return (
//       defaultLang ||
//       this.supportedLanguages?.[0] || {
//         code: 'ar',
//         name: 'العربية',
//         direction: 'rtl',
//       }
//     );
//   }

//   private getLanguageFromUrl(): string | null {
//     if (isPlatformBrowser(this.platformId)) {
//       const path = window.location.pathname;
//       const segments = path.split('/').filter((segment) => segment);
//       return segments.length > 0 && this.isLanguageSupported(segments[0])
//         ? segments[0]
//         : null;
//     }
//     return null;
//   }

//   private getBrowserLanguage(): string | null {
//     if (isPlatformBrowser(this.platformId)) {
//       const browserLang = navigator.language.split('-')[0];
//       return this.isLanguageSupported(browserLang) ? browserLang : null;
//     }
//     return null;
//   }

//   setLanguage(langCode: string): void {
//     const language = this.supportedLanguages.find(
//       (lang) => lang.code === langCode
//     );
//     if (language) {
//       this.currentLanguage.next(language);
//       this.directionService.setDirection(language.direction);

//       if (isPlatformBrowser(this.platformId)) {
//         document.documentElement.lang = langCode;
//         this.updateUrlLanguage(langCode);
//       }
//     }
//   }

//   private updateUrlLanguage(langCode: string): void {
//     if (isPlatformBrowser(this.platformId)) {
//       const currentPath = window.location.pathname;
//       const currentLang = this.getLanguageFromUrl();

//       // Always use language prefixes for all languages
//       if (currentLang !== langCode) {
//         const pathWithoutLang = this.getPathWithoutLanguage(
//           currentPath,
//           currentLang
//         );
//         const newPath = `/${langCode}${
//           pathWithoutLang ? `/${pathWithoutLang}` : '/home'
//         }`;

//         if (newPath !== currentPath) {
//           window.history.replaceState(null, '', newPath);
//         }
//       }
//     }
//   }

//   private getPathWithoutLanguage(
//     path: string,
//     currentLang: string | null
//   ): string {
//     if (!currentLang) return path.replace(/^\//, '');

//     const langPrefix = `/${currentLang}`;
//     if (path.startsWith(langPrefix)) {
//       return path.slice(langPrefix.length).replace(/^\//, '');
//     }

//     return path.replace(/^\//, '');
//   }

//   getCurrentLanguage(): Language {
//     return this.currentLanguage.value;
//   }

//   getSupportedLanguages(): Language[] {
//     return this.supportedLanguages;
//   }

//   isLanguageSupported(langCode: string): boolean {
//     return this.supportedLanguages.some((lang) => lang.code === langCode);
//   }

//   getLanguageName(langCode: string): string {
//     const lang = this.supportedLanguages.find((l) => l.code === langCode);
//     return lang ? lang.name : '';
//   }
// }

// src/app/services/language.service.ts (Alternative - Safer)
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DirectionService, Direction } from './direction.service';

export interface Language {
  code: string;
  name: string;
  direction: Direction;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage = new BehaviorSubject<Language>(
    this.createDefaultLanguage()
  );
  public currentLanguage$ = this.currentLanguage.asObservable();

  private readonly supportedLanguages: Language[] = [
    { code: 'en', name: 'English', direction: 'ltr' },
    { code: 'ar', name: 'العربية', direction: 'rtl' },
  ];

  constructor(
    private directionService: DirectionService,
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    // Initialize after a brief delay to avoid timing issues
    Promise.resolve().then(() => {
      this.initializeLanguage();
    });
  }

  private createDefaultLanguage(): Language {
    return { code: 'ar', name: 'العربية', direction: 'rtl' };
  }

  private initializeLanguage(): void {
    // Initialize ngx-translate
    this.translateService.setDefaultLang('ar');

    if (isPlatformBrowser(this.platformId)) {
      // Try to get language from URL first
      const urlLang = this.getLanguageFromUrl();
      if (urlLang && this.isLanguageSupported(urlLang)) {
        this.setLanguage(urlLang);
        return;
      }

      // Try to get from browser settings
      const browserLang = this.getBrowserLanguage();
      if (browserLang && this.isLanguageSupported(browserLang)) {
        this.setLanguage(browserLang);
        return;
      }
    }

    // Fallback to default language
    this.setLanguage('ar');
  }

  private getLanguageFromUrl(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const path = window.location.pathname;
      const langMatch = path.match(/^\/(en|ar)(\/|$)/);
      return langMatch ? langMatch[1] : null;
    }
    return null;
  }

  private getBrowserLanguage(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const browserLang = navigator.language.split('-')[0];
      return this.isLanguageSupported(browserLang) ? browserLang : null;
    }
    return null;
  }

  setLanguage(langCode: string): void {
    const language = this.supportedLanguages.find(
      (lang) => lang.code === langCode
    );
    if (language) {
      // Update ngx-translate
      this.translateService.use(langCode);

      // Update our service state
      this.currentLanguage.next(language);
      this.directionService.setDirection(language.direction);

      if (isPlatformBrowser(this.platformId)) {
        document.documentElement.lang = langCode;
        this.updateUrlLanguage(langCode);
      }
    }
  }

  private updateUrlLanguage(langCode: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentPath = window.location.pathname;
      const currentLang = this.getLanguageFromUrl();

      let newPath = currentPath;

      if (currentLang && currentLang !== langCode) {
        // Replace existing language in URL
        newPath = currentPath.replace(`/${currentLang}`, `/${langCode}`);
      } else if (!currentLang && langCode !== 'ar') {
        // Add language to URL if not default
        newPath = `/${langCode}${currentPath}`;
      }

      if (newPath !== currentPath) {
        window.history.replaceState(null, '', newPath);
      }
    }
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage.value;
  }

  getSupportedLanguages(): Language[] {
    return [...this.supportedLanguages]; // Return a copy
  }

  isLanguageSupported(langCode: string): boolean {
    return this.supportedLanguages.some((lang) => lang.code === langCode);
  }

  getLanguageName(langCode: string): string {
    const lang = this.supportedLanguages.find((l) => l.code === langCode);
    return lang ? lang.name : langCode;
  }

  instant(key: string): string {
    return this.translateService.instant(key);
  }

  get(key: string) {
    return this.translateService.get(key);
  }
}
