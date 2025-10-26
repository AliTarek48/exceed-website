import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../../directives/animate.directive';

@Component({
  selector: 'app-what-is-exceed',
  standalone: true,
  imports: [TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './what-is-exceed.component.html',
  styleUrl: './what-is-exceed.component.scss',
})
export class WhatIsExceedComponent {}
