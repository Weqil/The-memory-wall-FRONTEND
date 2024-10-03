import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ActivityComponent } from './components/activity/activity.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollService } from './services/scroll.service';
import { ActivityService } from './services/activity.service';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ActivityComponent,
    FooterComponent,
    NgxUiLoaderModule,
    CommonModule
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor
  (
    private scrollService: ScrollService,
    private router: Router,
    private activityService: ActivityService,

   ) 
   {

   }
   
  public title = 'theMemoryWall_frontend';
  public currentRout: string = ''
  public show:boolean = true;
  ngOnInit(): void {
    this.activityService.showPlug.subscribe(value => {
      this.show = value
   })
  }
}
