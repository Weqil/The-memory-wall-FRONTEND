import { Component, OnInit,inject } from '@angular/core';
import { Routes, RouterModule,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Keyboard from "simple-keyboard";
import { VeteransService } from '../../services/veterans.service';
import { IVeteran } from '../../models/veteran';
import { provideHttpClient } from '@angular/common/http';
import { CardGridComponent } from '../../components/card-grid/card-grid.component';
import { Router } from '@angular/router';
import { LetterComponent } from '../../components/letter/letter.component';
import { QueryBuilderService } from '../../services/query-builder.service';
import { FilterService } from '../../services/filter.service';
@Component({
  selector: 'app-veterans',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    CommonModule,
    CardGridComponent,
    LetterComponent
    
  ],
  providers: [VeteransService],
  templateUrl: './veterans.component.html',
  styleUrl: './veterans.component.scss'
})


export class VeteransComponent  implements OnInit {
    constructor(
      private route:Router,
      private queryBuilderService: QueryBuilderService,
      private filterService: FilterService
    ){}
    public veteransService:VeteransService = inject(VeteransService);
    public veteranArray:IVeteran[] = [];
    public letterArray: string[] = 'А Б В Г Д Е Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Э Ю Я Z A'.split(' ');
    public keyboard: any;
    public value = "";
    public veteransShowUrl:string = this.route.url
    public greekLayout:any = {
      'default': [
        'й ц у к е н г ш щ з х ъ {bksp}',
        'ф ы в а п р о л д ж э',
        'я ч с м и т ь б ю',
        '{space}'
      ],
      'shift': [
        '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
        '{tab} Й Ц У К Е Н Г Ш Щ З Х Ъ /',
        '{lock} Ф Ы В А П Р О Л Д Ж Э {enter}',
        '{shift} Я Ч С М И Т Ь Б Ю , {shift}',
        '.com @ {space}'
      ],
      buttonTheme: [
        {
          class: "keybord-button",
          buttons: "А Б В Г Д Е Ё Ж "
        }
      ]
    }
    
    ngAfterViewInit() {
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button)
      })
      this.keyboard.setOptions({
        layout: this.greekLayout
      })
    }

    onInputChange = (event: any) => {
      this.keyboard.setInput(event.target.value);
    };

    onChange = (input: string) => {
      this.value = input;
  
    };

    onKeyPress = (button: string) => {
    
    };

 
  getVeterans(param:string):void{
    this.veteransService.getVeterans(this.value).pipe().subscribe((res:any)=>{
      this.veteranArray = res.heroes;
      console.log(this.veteranArray[0])
    })
  }
  getVeteransByRubricId(){
    this.veteransService.getVeteransByRubricId(this.queryBuilderService.quertyBuilder('veteransForPage')).pipe().subscribe((res:any)=>{
      this.veteranArray = res.heroes.data;
      console.log(res.heroes.data)
    })
  }

  changeLetter(){
    this.filterService.changeFilter.pipe().subscribe((event)=>{
      this.getVeteransByRubricId()
    })
  }
  
  ngOnInit(): void {

    this.getVeteransByRubricId()
    this.changeLetter()

  }

}
