import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../../directives/animate.directive';

@Component({
  selector: 'app-about-us-header',
  standalone: true,
  imports: [TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './about-us-header.component.html',
  styleUrl: './about-us-header.component.scss',
})
export class AboutUsHeaderComponent {}
