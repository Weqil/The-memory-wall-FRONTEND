import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HistoryService } from './services/history.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor
  (
    private router: Router,
    private historyService: HistoryService
   ) 
   {

   }
  public title = 'theMemoryWall_frontend';
  public currentRout: string = ''
  ngOnInit(): void {
    
  }
}
