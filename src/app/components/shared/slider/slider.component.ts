import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [TranslatePipe, CarouselModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  customOptions: OwlOptions = {
    rtl: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-chevron-right"></i>',
      '<i class="fa-solid fa-chevron-left"></i>',
    ],
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoplaySpeed: 800,
    smartSpeed: 500,
    margin: 16,
    autoWidth: false,
    startPosition: 0,
    center: true,
    items: 4,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      576: {
        items: 1,
        nav: true,
      },
      768: {
        items: 2,
        nav: true,
      },
      992: {
        items: 2,
        nav: true,
      },
      1200: {
        items: 3,
        nav: true,
      },
    },
    nav: true,
  };
}
