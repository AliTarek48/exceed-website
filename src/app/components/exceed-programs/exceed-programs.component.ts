import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../directives/animate.directive';

@Component({
  selector: 'app-exceed-programs',
  standalone: true,
  imports: [TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './exceed-programs.component.html',
  styleUrl: './exceed-programs.component.scss',
})
export class ExceedProgramsComponent {}
