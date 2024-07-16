import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor() { }

  startTime(){
    let timerId = setInterval(() => alert('tick'), 2000);
  }
}
