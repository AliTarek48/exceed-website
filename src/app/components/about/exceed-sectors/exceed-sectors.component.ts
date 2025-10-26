import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CounterComponent } from '../../counter/counter.component';
import { AnimateOnScrollDirective } from '../../../directives/animate.directive';

@Component({
  selector: 'app-exceed-sectors',
  standalone: true,
  imports: [TranslatePipe, CounterComponent, AnimateOnScrollDirective],
  templateUrl: './exceed-sectors.component.html',
  styleUrl: './exceed-sectors.component.scss',
})
export class ExceedSectorsComponent {}
