import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { AnimateOnScrollDirective } from '../../directives/animate.directive';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';

@Component({
  selector: 'app-home-vh-page',
  standalone: true,
  imports: [TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './home-vh-page.component.html',
  styleUrl: './home-vh-page.component.scss',
})
export class HomeVhPageComponent {
  currentLanguage: any = 'ar';
  languageService = inject(LanguageService);
  showUseNowModal = false;

  constructor() {
    this.currentLanguage = this.languageService.getCurrentLanguage()?.code;
    console.log(this.currentLanguage);
  }
}
