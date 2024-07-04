import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }
  public letter: BehaviorSubject<string> = new BehaviorSubject('')

  public rubricId: BehaviorSubject<number[]> = new BehaviorSubject([0])

  public changeFilter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  )

  getRubricId() {
    return this.rubricId.getValue();
  }
  setRubricId(id:number[]) {
    this.rubricId.next(id);
  }

  removeFilters() {
    this.rubricId.next([])
    this.letter.next('')
  }


  getLetter():string{
    return this.letter.getValue();
  }

  setLetter(word: string):void {
    this.letter.next(word);
  }
  
}
