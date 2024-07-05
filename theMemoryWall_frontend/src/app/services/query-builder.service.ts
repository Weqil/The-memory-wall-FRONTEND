import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterService } from './filter.service';
import { IQuery } from '../models/query';

@Injectable({
  providedIn: 'root'
})
export class QueryBuilderService {

  public rubricIds:string  = ''
  public queryParams:IQuery = {};
  public letter:string = ''
  public fullName:string = ''
  public paginateVeterans:BehaviorSubject<string> = new BehaviorSubject<string>('')
  public limitVeterans:BehaviorSubject<number> = new BehaviorSubject<number>(10)

  constructor(private filterService:FilterService) { }

  updateParams():void{
    this.rubricIds = this.filterService.getRubricIds() 
    this.letter = this.filterService.getLetter()
    this.fullName = this.filterService.getFullName()
  }

  quertyBuilder(page:string):any
  {
    this.updateParams()
    switch(page){
      case 'veteransForPage':
        this.veteranForPage()
        break;
    }
    return this.queryParams
  }

  veteranForPage():void{
    this.queryParams = {
      rubricIds: this.rubricIds,
      letter: this.letter,
      limit: this.limitVeterans.value,
      page: this.paginateVeterans.value,
      full_name: this.fullName
    }
  }

  setPaginateVeterans(page:string):void{
    this.paginateVeterans.next(page)
  }
}
