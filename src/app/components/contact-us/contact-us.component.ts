import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FormComponent } from './components/form/form.component';
import { AboutRegisterComponent } from '../about/about-register/about-register.component';
import { QuestionsComponent } from './components/questions/questions.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormComponent, AboutRegisterComponent, QuestionsComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {}
