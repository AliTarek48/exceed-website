import { Component } from '@angular/core';
import { PackagesHomeComponent } from './components/packages-home/packages-home.component';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [PackagesHomeComponent],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss',
})
export class PackagesComponent {}
