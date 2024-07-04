import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
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
  constructor(private filterService: FilterService){}
@Input() letter:string = ''
public currentletter:string = ''



setFilter(){
  this.filterService.setLetter(this.letter)
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
