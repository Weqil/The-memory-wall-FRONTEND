import { Component, Input } from '@angular/core';
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
public host:string = environment.backHost
public port:string = environment.backPort
public protocol:string = environment.backProtocol
canceledRequest(){
  console.log( this.queryBuilderService.wait)
  this.router.navigate([`veteran/${this.veteran.id}`]);
}
}
