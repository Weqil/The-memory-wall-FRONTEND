import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  constructor(
    private router: Router
  ){}
  url:string = ''

  ngOnInit(): void {
    this.router.events.subscribe((events:any)=>{
      this.url = events.url
      if(this.url){
        this.url.includes('/veteran/' ) ? this.url = '/veteran/' : ''
      }

      console.log(this.url)
    })
  }
}
