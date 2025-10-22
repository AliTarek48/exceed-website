import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../directives/animate.directive';

@Component({
  selector: 'app-exceed-cloud',
  standalone: true,
  imports: [TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './exceed-cloud.component.html',
  styleUrl: './exceed-cloud.component.scss',
})
export class ExceedCloudComponent {}
