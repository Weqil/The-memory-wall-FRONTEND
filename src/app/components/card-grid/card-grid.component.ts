import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { IVeteran } from '../../models/veteran';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    NgxUiLoaderModule
  ],
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.scss'
})

export class CardGridComponent implements OnInit {

  @Input() veterans!:IVeteran[]
  @Input() notFound: boolean = false
  @Output() scrollEdgeEvents = new EventEmitter();
  @Output() cardEmitt = new EventEmitter();
  @ViewChild('grid') grid!:ElementRef
  constructor(private scrollService: ScrollService){

  }

  ngOnInit(): void {
  
  }

  checkScrollEdge(func: () => void, block:HTMLElement){
    let edgePosition:any = (block.scrollHeight - block.clientHeight) - ((block.scrollHeight - block.clientHeight)*0.6);
    if (edgePosition  <= block.scrollTop) {
      edgePosition += block.scrollTop
      func();
    }
  }
  cardClick(event:any){
    this.cardEmitt.emit(event)
  }
  ngAfterViewInit(): void {
    if(this.grid.nativeElement){
      let block = this.grid.nativeElement
      block.addEventListener('scroll',()=>{
        this.checkScrollEdge(()=>{
          this.scrollEdgeEvents.emit()
        },block)

      })
    }
  }
}
