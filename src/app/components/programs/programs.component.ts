import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProgramsHomeComponent } from './components/programs-home/programs-home.component';
import { SalesManagmentComponent } from './components/sales-managment/sales-managment.component';
import { CustomerManagmentComponent } from './components/customer-managment/customer-managment.component';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [
    ProgramsHomeComponent,
    SalesManagmentComponent,
    CustomerManagmentComponent,
  ],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss',
})
export class ProgramsComponent {}
