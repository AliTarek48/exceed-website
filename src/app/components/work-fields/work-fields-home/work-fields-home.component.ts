import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-work-fields-home',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './work-fields-home.component.html',
  styleUrl: './work-fields-home.component.scss',
})
export class WorkFieldsHomeComponent {}
