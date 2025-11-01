import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../../../directives/animate.directive';

@Component({
  selector: 'app-customer-managment',
  standalone: true,
  imports: [TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './customer-managment.component.html',
  styleUrl: './customer-managment.component.scss',
})
export class CustomerManagmentComponent {}
