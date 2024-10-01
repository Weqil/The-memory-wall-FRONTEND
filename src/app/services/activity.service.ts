import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private router:Router
  ) { }
  public timeActive: number = 120;
  public wait:boolean = true;
  public showPlug:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  public timerId:BehaviorSubject<any> = new BehaviorSubject<any>('')
  public changeTime: BehaviorSubject<number> = new BehaviorSubject<number>(120)
  public changeTimeStartValue = this.changeTime.value
  startTime(func:()=>void) {
    if(this.wait){
      this.timerId.next(setInterval(()=>{
        this.changeTime.next(this.changeTime.value - 1);
      },1000))
    }
  }

  checkTimer(){
    this.changeTime.subscribe(()=>{
      if(this.changeTime.value == 0){
        clearInterval(this.timerId.value);
        this.showPlug.next(true);
        this.wait = true
        this.changeTime.next(this.changeTimeStartValue)
        this.router.navigate(['/home'])
      }
    })
  }
  restartTimer() {
    this.showPlug.next(false);
    this.wait = true;
    this.changeTime.next(this.changeTimeStartValue)
    clearInterval(this.timerId.value);
    this.startTime(() => {})
    this.checkTimer()
  }
  
}
