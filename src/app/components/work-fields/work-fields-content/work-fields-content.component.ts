import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../../directives/animate.directive';

@Component({
  selector: 'app-work-fields-content',
  standalone: true,
  imports: [TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './work-fields-content.component.html',
  styleUrl: './work-fields-content.component.scss',
})
export class WorkFieldsContentComponent {}
