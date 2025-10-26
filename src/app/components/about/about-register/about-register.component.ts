import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../../directives/animate.directive';

@Component({
  selector: 'app-about-register',
  standalone: true,
  imports: [TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './about-register.component.html',
  styleUrl: './about-register.component.scss',
})
export class AboutRegisterComponent {}
