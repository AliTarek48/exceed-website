import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  customOptions: OwlOptions = {
    rtl: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    // navText: ['›', '‹'], // Swapped for RTL
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoplaySpeed: 500,
    margin: 20,
    autoWidth: true,
    startPosition: 0,
    center: false,
    responsive: {
      0: {
        items: 2,
        nav: false, // Hide navigation on mobile
      },
      768: {
        items: 3,
        nav: false,
      },
      992: {
        items: 4,
        nav: false,
      },

      1200: {
        items: 6,
        nav: false,
      },
    },
    nav: false,
  };

  items = [
    { name: 'logo-client-cenomi' },
    { name: 'logo-client-dapi' },
    { name: 'logo-client-lean' },
    { name: 'logo-client-platinum-list' },
    { name: 'logo-client-ssc' },
    { name: 'logo-client-tabby' },
    { name: 'logo-client-taeen' },
  ];
}
