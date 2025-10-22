import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../directives/animate.directive';

@Component({
  selector: 'app-company-trust',
  standalone: true,
  imports: [TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './company-trust.component.html',
  styleUrl: './company-trust.component.scss',
})
export class CompanyTrustComponent {}
