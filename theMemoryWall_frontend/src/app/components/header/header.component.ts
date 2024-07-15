import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackButtonComponent } from '../back-button/back-button.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    BackButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
