import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-packages-home',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './packages-home.component.html',
  styleUrl: './packages-home.component.scss',
})
export class PackagesHomeComponent {
  selectedPackage: string = 'annual';

  selectPackage(type: string): void {
    this.selectedPackage = type;
  }
}
