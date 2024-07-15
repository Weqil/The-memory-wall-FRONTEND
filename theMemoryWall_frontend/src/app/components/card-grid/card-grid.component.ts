import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { IVeteran } from '../../models/veteran';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule
  ],
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.scss'
})

export class CardGridComponent implements OnInit {

  @Input() veterans!:IVeteran[]
  @Output() scrollEdgeEvents = new EventEmitter();
  @ViewChild('grid') grid!:ElementRef
  constructor(private scrollService: ScrollService){

  }

  ngOnInit(): void {
    this.scrollService.scrollStart(this.grid)
    this.scrollService.setCheckScrollEdge(()=>{
      console.log('scroll')
    },this.grid)
  }
  
}
