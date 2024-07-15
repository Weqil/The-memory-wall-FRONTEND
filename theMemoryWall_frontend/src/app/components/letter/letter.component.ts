import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { QueryBuilderService } from '../../services/query-builder.service';
import { Subject } from 'rxjs';
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
  private readonly destroy$ = new Subject<void>()
  constructor(
    private cdr: ChangeDetectorRef,
    private filterService: FilterService,
    private queryBuilderService: QueryBuilderService,
  ){}
@Input() letter:string = ''
@Output() letterChanged = new EventEmitter();
public currentletter:string = this.filterService.getLetter()



setFilter(){
  this.letterChanged.emit(this.letter)
}

ngOnInit(): void {
  this.filterService.letter.pipe().subscribe(() => {
    this.currentletter = this.filterService.getLetter()
  })
}

ngOnDestroy(): void {
  this.filterService.removeFilters()
  this.destroy$.next()
  this.destroy$.complete()
}

}
