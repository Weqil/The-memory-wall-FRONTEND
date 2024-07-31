import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackButtonComponent } from '../back-button/back-button.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    BackButtonComponent,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
public url:string = ''
constructor(private route:Router){

}
ngOnInit() {
  this.route.events.subscribe((event:any) => {
    this.url = event.url;  
  
  })
}
}
