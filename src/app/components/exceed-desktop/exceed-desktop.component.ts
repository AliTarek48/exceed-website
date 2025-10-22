import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../directives/animate.directive';

@Component({
  selector: 'app-exceed-desktop',
  standalone: true,
  imports: [TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './exceed-desktop.component.html',
  styleUrl: './exceed-desktop.component.scss',
})
export class ExceedDesktopComponent {}
