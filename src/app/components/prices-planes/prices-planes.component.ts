import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../directives/animate.directive';

@Component({
  selector: 'app-prices-planes',
  standalone: true,
  imports: [TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './prices-planes.component.html',
  styleUrl: './prices-planes.component.scss',
})
export class PricesPlanesComponent {}
