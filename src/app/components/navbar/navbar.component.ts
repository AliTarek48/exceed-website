import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { RouteLocalizationService } from '../../services/route-localization.service';
import { filter } from 'rxjs';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslatePipe, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  languageService = inject(LanguageService);
  private router = inject(Router);
  private routeLocalizationService = inject(RouteLocalizationService);
  readonly navbarService = inject(NavbarService);
  activeRoute: string = '';

  currentLanguage = 'ar';

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
}
