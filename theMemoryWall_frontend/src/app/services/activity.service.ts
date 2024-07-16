import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor() { }
  public timeActive: number = 120;
  public wait:boolean = true;
  public showTime:BehaviorSubject<number> = new BehaviorSubject<number>(this.timeActive)
  public showPlug:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  startTime(func:()=>void) {
    this.timeActive = 120;
    if(this.wait){
      this.wait = false;
      this.showPlug.next(false) ;
      let timerId = setInterval(() => {
        if (this.timeActive != 0) {
          console.log(this.timeActive);
          this.showTime.next(this.timeActive);
          this.timeActive--;
          this.showPlug.next(false);
        } else {
          console.log('time end');
          this.showPlug.next(false);
          this.wait = true;
          func();
          clearInterval(timerId);
        }
        
        if (this.timeActive <= 10 && this.timeActive != 0) {
          this.showPlug.next(true);
        } else {
          this.showPlug.next(false);
        }
      }, 1000);
    }
    
  }
}
