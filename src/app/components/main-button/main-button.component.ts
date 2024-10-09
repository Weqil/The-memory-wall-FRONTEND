import { Component, Input } from '@angular/core';
import { IRubrics } from '../../models/rubrics';
import { environment } from '../../../environments/environments';
import { RouterLink } from '@angular/router';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-main-button',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    NgClass
  ],
  templateUrl: './main-button.component.html',
  styleUrl: './main-button.component.scss'
})
export class MainButtonComponent {
  constructor(
    private filterService: FilterService,

  ){}
@Input() rubric!:IRubrics
public host:string = environment.backHost
public port:string = environment.backPort
public protocol:string = environment.backProtocol
@Input() reversed:boolean = false

setFilter(){
  this.filterService.setRubricIds(`${this.rubric.id}`)
}
goToRemember() {
  document.location.href = `https://pamyat-naroda.ru/heroes/?editable=true`
}
}
