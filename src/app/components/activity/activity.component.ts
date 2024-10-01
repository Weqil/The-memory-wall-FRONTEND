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
     this.activityService.restartTimer()
  }

  ngOnInit(): void {
    this.time = 0

    this.activityService.showPlug.subscribe(value => {
        this.show = value
    })

    this.activityService.changeTime.subscribe(value => {
      this.time = this.activityService.changeTime.value
    })

  }
}
