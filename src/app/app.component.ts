import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ActivityComponent } from './components/activity/activity.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollService } from './services/scroll.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ActivityComponent,
    FooterComponent,
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor
  (
    private scrollService: ScrollService,
    private router: Router,

   ) 
   {

   }
   
  public title = 'theMemoryWall_frontend';
  public currentRout: string = ''
  ngOnInit(): void {
    
  }
}
