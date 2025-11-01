import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../../../directives/animate.directive';

@Component({
  selector: 'app-programs-home',
  standalone: true,
  imports: [TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './programs-home.component.html',
  styleUrl: './programs-home.component.scss',
})
export class ProgramsHomeComponent {}
