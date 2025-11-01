import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-carousel',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './home-carousel.component.html',
  styleUrl: './home-carousel.component.scss',
})
export class HomeCarouselComponent implements OnInit, OnDestroy {
  showCarousel = true; // Set to true by default
  private routerSubscription: Subscription;

  customOptions: OwlOptions = {
    rtl: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [''],
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      740: { items: 2 },
      940: { items: 2 },
      1200: { items: 2 },
    },
    nav: false,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoWidth: false,
  };

  constructor(private router: Router) {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.reinitializeCarousel();
      });
  }

  ngOnInit() {
    // Ensure it's visible on initial load
    this.showCarousel = true;
  }

  private reinitializeCarousel() {
    // Only reinitialize if we're on a page that should show the carousel
    if (this.router.url === '/home' || this.router.url === '/') {
      this.showCarousel = false;

      setTimeout(() => {
        this.showCarousel = true;
      }, 150);
    }
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
