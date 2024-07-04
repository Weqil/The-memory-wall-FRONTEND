import { Component, Input } from '@angular/core';
import { IVeteran } from '../../models/veteran';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
@Input() veteran!:IVeteran
}
