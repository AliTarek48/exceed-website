// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((c) => c.HomeComponent),
    data: {
      title: 'Home',
      navbarBackground: false,
    },
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about-us/about-us.component').then(
        (c) => c.AboutUsComponent
      ),
    data: {
      title: 'About',
      navbarBackground: true,
    },
  },

  {
    path: 'work-fields',
    loadComponent: () =>
      import('./components/work-fields/work-fields.component').then(
        (c) => c.WorkFieldsComponent
      ),
    data: {
      title: 'WorkFields',
      navbarBackground: true,
    },
  },
];
