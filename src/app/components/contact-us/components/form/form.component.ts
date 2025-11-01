import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  languageService = inject(LanguageService);
  currentLanguage: string = 'ar';
  constructor() {
    this.currentLanguage = this.languageService.getCurrentLanguage()?.code;
    console.log(this.currentLanguage);
  }
}
