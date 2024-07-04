import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule,RouterLink } from '@angular/router';
import { RubricService } from '../../services/rubric.service';
import { QueryBuilderService } from '../../services/query-builder.service';
import { FilterService } from '../../services/filter.service';
import { MainButtonComponent } from '../../components/main-button/main-button.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    MainButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(
    private rubricService: RubricService,
    private queryBuilderService: QueryBuilderService,
    private filterService: FilterService,
  ){

  }

  getRubric():void{
    this.rubricService.getRubric(this.queryBuilderService.quertyBuilder('veteransForPage')).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.getRubric()
   
  }
}
