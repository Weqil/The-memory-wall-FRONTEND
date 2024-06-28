import { Component } from '@angular/core';
import { Routes, RouterModule,RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
