import { Component, HostListener, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent implements OnInit {
  constructor(private activityService: ActivityService,private router:Router){}
  public show:boolean = this.activityService.showPlug.value;
  public time:number = this.activityService.timeActive
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    let target = event.target as HTMLElement
     this.activityService.startTime(()=>{
      this.router.navigate(['/home'])
    })
  }

  ngOnInit(): void {

    this.activityService.showPlug.subscribe(value => {
        this.show = value
    })
    this.activityService.showTime.subscribe(value => {
      this.time = this.activityService.showTime.value
    })
    this.activityService.startTime(()=>{
      console.log(this.show)
      this.router.navigate(['/home'])
    })
  }
}
