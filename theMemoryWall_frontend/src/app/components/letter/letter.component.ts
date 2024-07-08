import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { QueryBuilderService } from '../../services/query-builder.service';
@Component({
  selector: 'app-letter',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './letter.component.html',
  styleUrl: './letter.component.scss'
})
export class LetterComponent implements OnInit, OnDestroy {
  constructor(
    private filterService: FilterService,
    private queryBuilderService: QueryBuilderService,
  ){}
@Input() letter:string = ''
public currentletter:string = ''



setFilter(){
  if(this.filterService.getLetter() == this.letter){
    this.filterService.setLetter('')
    this.filterService.changeFilter.next(true)
  }else{
    this.filterService.setLetter(this.letter)
    this.filterService.changeFilter.next(true)
  }
  

}

ngOnInit(): void {
  this.filterService.letter.pipe().subscribe(() => {
    this.currentletter = this.filterService.getLetter()
  })
}

ngOnDestroy(): void {
  this.filterService.removeFilters()
}

}
