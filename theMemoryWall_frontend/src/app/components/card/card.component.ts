import { Component, Input } from '@angular/core';
import { IVeteran } from '../../models/veteran';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environments';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
@Input() veteran!:IVeteran
public host:string = environment.backHost
public port:string = environment.backPort
public protocol:string = environment.backProtocol
}
