import { Component } from '@angular/core';
import { HomeVhPageComponent } from '../home-vh-page/home-vh-page.component';
import { CounterComponent } from '../counter/counter.component';
import { CompanyTrustComponent } from '../company-trust/company-trust.component';
import { BrandsComponent } from '../brands/brands.component';
import { ExceedCloudComponent } from '../exceed-cloud/exceed-cloud.component';
import { ExceedDesktopComponent } from '../exceed-desktop/exceed-desktop.component';
import { ExceedProgramsComponent } from '../exceed-programs/exceed-programs.component';
import { ExceedSolutionsComponent } from '../exceed-solutions/exceed-solutions.component';
import { PricesPlanesComponent } from '../prices-planes/prices-planes.component';
import { CustomerReviewsComponent } from '../customer-reviews/customer-reviews.component';
import { QuestionsComponent } from '../contact-us/components/questions/questions.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeVhPageComponent,
    CounterComponent,
    CompanyTrustComponent,
    BrandsComponent,
    ExceedCloudComponent,
    ExceedDesktopComponent,
    ExceedProgramsComponent,
    ExceedSolutionsComponent,
    PricesPlanesComponent,
    CustomerReviewsComponent,
    QuestionsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
