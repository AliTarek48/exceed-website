import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../directives/animate.directive';
import { SliderComponent } from '../shared/slider/slider.component';

@Component({
  selector: 'app-customer-reviews',
  standalone: true,
  imports: [TranslatePipe, SliderComponent, AnimateOnScrollDirective],
  templateUrl: './customer-reviews.component.html',
  styleUrl: './customer-reviews.component.scss',
})
export class CustomerReviewsComponent {}
