import { Component } from '@angular/core';
import { Routes, RouterModule,RouterLink, ActivatedRoute } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';
import { QueryBuilderService } from '../../services/query-builder.service';
import { FilterService } from '../../services/filter.service';
import {CookieService} from 'ngx-cookie-service';
import { RubricService } from '../../services/rubric.service';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
@Component({
  selector: 'app-memory-people',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    BackButtonComponent
  ],
  templateUrl: './memory-people.component.html',
  styleUrl: './memory-people.component.scss'
})
export class MemoryPeopleComponent {
  constructor( 
    private cookieService: CookieService,  // added CookieService
    private scrollService:ScrollService,
    private route:ActivatedRoute,
    private queryBuilderService: QueryBuilderService,
    private filterService: FilterService,
    private rubricService: RubricService
  ){

  }
  getCookie(){
   
  }
  ngOnDestroy(): void {
    this.filterService.setFullName('')
    this.filterService.setLetter('')
    this.queryBuilderService.setPaginateVeteransValue(true)
    this.queryBuilderService.setPaginateVeterans('')
    this.scrollService.scrollEnd()
  }

}
