import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule,RouterLink, Router } from '@angular/router';
import { RubricService } from '../../services/rubric.service';
import { QueryBuilderService } from '../../services/query-builder.service';
import { FilterService } from '../../services/filter.service';
import { MainButtonComponent } from '../../components/main-button/main-button.component';
import { CommonModule } from '@angular/common';
import { IRubrics } from '../../models/rubrics';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivityService } from '../../services/activity.service';
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
    private router: Router,
    private ngxUiLoaderService: NgxUiLoaderService,
    private activityService: ActivityService
  ){

  }
  public rubrics?:IRubrics[]
  getRubric():void{
    if(!this.activityService.showPlug.value){
      this.ngxUiLoaderService.start()
    }
  
    this.rubricService.getRubric(this.queryBuilderService.quertyBuilder('veteransForPage')).pipe().subscribe((data) => {
      this.ngxUiLoaderService.stop()
      this.rubrics = data.rubric;
    });
  }

  ngOnInit(): void {
    this.getRubric()
    
  }
}
