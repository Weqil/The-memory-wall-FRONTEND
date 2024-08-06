import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IVeteran } from '../../models/veteran';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationExtras } from '@angular/router';
import { environment } from '../../../environments/environments';
import { QueryBuilderService } from '../../services/query-builder.service';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink,CommonModule,],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  constructor(
    private queryBuilderService: QueryBuilderService,
    private router: Router
  ){}

@Input() veteran!:IVeteran
@Output() cardEmitt = new EventEmitter();
public host:string = environment.backHost
public port:string = environment.backPort
public protocol:string = environment.backProtocol
cardClick(){
  this.cardEmitt.emit(this.veteran.id)
}
canceledRequest(){
  this.router.navigate([`veteran/${this.veteran.id}`]);
}
}
