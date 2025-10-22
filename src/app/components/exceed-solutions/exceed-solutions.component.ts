import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../directives/animate.directive';

@Component({
  selector: 'app-exceed-solutions',
  standalone: true,
  imports: [TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './exceed-solutions.component.html',
  styleUrl: './exceed-solutions.component.scss',
})
export class ExceedSolutionsComponent {}
