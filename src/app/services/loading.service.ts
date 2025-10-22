import { Injectable, ApplicationRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EnhancedLoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(true);
  public loading$ = this.loadingSubject.asObservable();

  private isAppStable = false;
  private isNavigationComplete = false;

  constructor(
    private appRef: ApplicationRef,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  initialize() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupAppStabilityCheck();
      this.setupRouterListener();
      //   this.setupFallbackTimeout();
    } else {
      this.hide();
    }
  }

  private setupAppStabilityCheck() {
    this.appRef.isStable
      .pipe(first((stable) => stable === true))
      .subscribe(() => {
        console.log('✅ Angular app is stable - bundles loaded!');
        this.isAppStable = true;
        this.checkIfCanHide();
      });
  }

  private setupRouterListener() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        console.log('✅ First navigation complete!');
        this.isNavigationComplete = true;
        this.checkIfCanHide();
      });
  }

  private setupFallbackTimeout() {
    setTimeout(() => {
      console.log('⏰ Fallback timeout - hiding loader');
      this.hide();
    }, 8000);
  }

  private checkIfCanHide() {
    // Hide when both conditions are met
    if (this.isAppStable && this.isNavigationComplete) {
      console.log('🎉 All conditions met - hiding loader!');
      setTimeout(() => this.hide(), 300);
    }
  }

  hide() {
    if (this.loadingSubject.value) {
      this.loadingSubject.next(false);
    }
  }
}
