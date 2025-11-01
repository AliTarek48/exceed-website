import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  RouteReuseStrategy,
  withInMemoryScrolling,
} from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideTranslateService, TranslateModule } from '@ngx-translate/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LanguageGuard } from './guards/language.guard';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CustomRouteReuseStrategy } from './services/route-reuse';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      [],
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),

    // {
    //   provide: RouteReuseStrategy,
    //   useClass: CustomRouteReuseStrategy,
    // },
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: 'i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'ar',
      lang: 'ar',
    }),
    LanguageGuard,
    importProvidersFrom(TranslateModule),
    provideAnimations(),
  ],
};
