import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScrollDirective } from '../../../../directives/animate.directive';

@Component({
  selector: 'app-sales-managment',
  standalone: true,
  imports: [TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './sales-managment.component.html',
  styleUrl: './sales-managment.component.scss',
})
export class SalesManagmentComponent {}
