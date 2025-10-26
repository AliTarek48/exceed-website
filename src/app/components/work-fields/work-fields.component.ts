import { Component } from '@angular/core';
import { WorkFieldsHomeComponent } from './work-fields-home/work-fields-home.component';
import { WorkFieldsContentComponent } from './work-fields-content/work-fields-content.component';

@Component({
  selector: 'app-work-fields',
  standalone: true,
  imports: [WorkFieldsHomeComponent, WorkFieldsContentComponent],
  templateUrl: './work-fields.component.html',
  styleUrl: './work-fields.component.scss',
})
export class WorkFieldsComponent {}
