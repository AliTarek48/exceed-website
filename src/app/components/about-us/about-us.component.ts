import { Component } from '@angular/core';
import { AboutUsHeaderComponent } from '../about/about-us-header/about-us-header.component';
import { WhatIsExceedComponent } from '../about/what-is-exceed/what-is-exceed.component';
import { AboutRegisterComponent } from '../about/about-register/about-register.component';
import { ExceedSectorsComponent } from '../about/exceed-sectors/exceed-sectors.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    AboutUsHeaderComponent,
    WhatIsExceedComponent,
    WhatIsExceedComponent,
    AboutRegisterComponent,
    ExceedSectorsComponent,
    ExceedSectorsComponent,
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {}
