import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule,RouterLink } from '@angular/router';
import { RubricService } from '../../services/rubric.service';
import { QueryBuilderService } from '../../services/query-builder.service';
import { FilterService } from '../../services/filter.service';
import { MainButtonComponent } from '../../components/main-button/main-button.component';
import { CommonModule } from '@angular/common';
import { IRubrics } from '../../models/rubrics';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    MainButtonComponent,
    CommonModule
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
  public rubrics?:IRubrics[]
  getRubric():void{
    this.rubricService.getRubric(this.queryBuilderService.quertyBuilder('veteransForPage')).pipe().subscribe((data) => {
      this.rubrics = data.rubrics;
    });
  }

  ngOnInit(): void {
    this.getRubric()
   
  }
}
