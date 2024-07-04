import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }
  public letter: BehaviorSubject<string> = new BehaviorSubject('')

  public rubricIds: BehaviorSubject<string> = new BehaviorSubject(this.getRubricIds() || '')

  public changeFilter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  )

  getRubricIds() {
      return localStorage.getItem('rubric') || '';
  }
  setRubricIds(id:string) {
      localStorage.setItem('rubric', id);
      this.rubricIds.next(id);
    }

  removeFilters() {
    this.rubricIds.next('')
    this.letter.next('')
    localStorage.removeItem('rubric');
  }


  getLetter():string{
    return this.letter.getValue();
  }

  setLetter(word: string):void {
    this.letter.next(word);
  }
  
}
