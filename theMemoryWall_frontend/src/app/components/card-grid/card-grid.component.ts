import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { IVeteran } from '../../models/veteran';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule
  ],
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.scss'
})
export class CardGridComponent {

  @Input() veterans!:IVeteran[]

}
