import { Component } from '@angular/core';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [BackButtonComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

}
