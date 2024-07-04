import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private router:Router) { }
  public historyArray: BehaviorSubject<string[]> = new BehaviorSubject([''])
  public newRout:string[] = []
  getHistory(): void {
    
      this.historyArray.next(this.router.url.split('/'))

      this.historyArray.value.forEach(element => {
    
        switch(String(element)){
          case 'home':
            this.newRout.push('Главаная')
          break;
          case 'veterans':
            this.newRout.push('Судьба солдата')
          break;
          case 'wow':
          this.newRout.push('Великая отечественная война')
          break;
        }

      });
  }
}
