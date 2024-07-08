import { Component, ElementRef, HostListener, Inject, OnInit,ViewChild,inject } from '@angular/core';
import { Routes, RouterModule,RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import Keyboard from "simple-keyboard";
import { VeteransService } from '../../services/veterans.service';
import { IVeteran } from '../../models/veteran';
import { provideHttpClient } from '@angular/common/http';
import { CardGridComponent } from '../../components/card-grid/card-grid.component';
import { Router, } from '@angular/router';
import { LetterComponent } from '../../components/letter/letter.component';
import { QueryBuilderService } from '../../services/query-builder.service';
import { FilterService } from '../../services/filter.service';
import { ScrollService } from '../../services/scroll.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-veterans',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    CommonModule,
    CardGridComponent,
    LetterComponent,
   
    
  ],
  providers: [VeteransService],
  templateUrl: './veterans.component.html',
  styleUrl: './veterans.component.scss'
})


export class VeteransComponent  implements OnInit {
    constructor(
      @Inject(DOCUMENT) private document: Document,
      private scrollService:ScrollService,
      private route:ActivatedRoute,
      private queryBuilderService: QueryBuilderService,
      private filterService: FilterService
    ){}
    
    @ViewChild('test') test!:ElementRef
    public veteransService:VeteransService = inject(VeteransService);
    public veteranArray:IVeteran[] = [];
    public letterArray: string[] = 'А Б В Г Д Е Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Э Ю Я'.split(' ');
    public waitRequest: boolean = false;
    public keyboard: any;
    public wait: boolean = true;
    public value = "";
    public veteransShowUrl:string = this.route.snapshot.params['id']
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
      this.filterService.setFullName(this.value)
      if(this.value.length <= 0) {
        this.requestTemplate()
        this.getVeteransByRubricId()
      }
  
    };

    onKeyPress = (button: string) => {
    
    };


  getVeterans(param:string):void{
    this.veteransService.getVeterans(this.value).pipe().subscribe((res:any)=>{
      this.veteranArray = res.heroes;
    })
    //получаю ветеранов
  }

  searchVeteranName(){
    this.requestTemplate()
    this.getVeteransByRubricId()
    // делаю запрос с новым фильтром задаю его в функции для ввода имени с клавиатуры
  }

  getVeteransByRubricId(){
    if (this.wait && this.queryBuilderService.paginateVeteransValue) {
      if(localStorage.getItem('rubric')){
        this.wait = false
        //Добавил проверку для того что бы не было багов с пустым локал сторедж
          this.veteransService.getVeteransByRubricId(this.queryBuilderService.quertyBuilder('veteransForPage')).pipe().subscribe((res:any)=>{
          this.veteranArray = this.veteranArray.concat(res.heroes.data);
          console.log(res.heroes)
          this.wait = !this.wait
          if(res.heroes.next_cursor){
            this.queryBuilderService.setPaginateVeterans(res.heroes.next_cursor)
          }else{
            this.queryBuilderService.setPaginateVeteransValue(false)
            
          }
          
        })
      } else{
        this.wait = false
        this.filterService.setRubricIds(this.veteransShowUrl)
        this.veteransService.getVeteransByRubricId(this.queryBuilderService.quertyBuilder('veteransForPage')).pipe().subscribe((res:any)=>{
          this.veteranArray = res.heroes.data;
          // this.wait = !this.wait
          console.log(res.heroes.data)
        })
      }
    }
    
  
  }

  requestTemplate(){
   this.queryBuilderService.setPaginateVeteransValue(true)
   this.queryBuilderService.setPaginateVeterans('')
    this.veteranArray.length = 0
    this.paginateSubmit()
    // обнуляем массив для нового заполнения и подключаем новое отслежевание пагинации
  }

  changeLetter(){
    this.filterService.changeFilter.pipe().subscribe((event)=>{
      this.requestTemplate()
      this.queryBuilderService.setPaginateVeterans(null)
      this.getVeteransByRubricId()
    })
  }
  
  paginateSubmit(){
    this.scrollService.setCheckScrollEdge(()=>{
      this.getVeteransByRubricId()
    }) 
    // при каждом окончании страницы делаем запрос на новую пагинцаию с текущими фильтрами 
  }

  ngOnInit(): void {
    this.scrollService.scrollStart()
    this.paginateSubmit()

    this.changeLetter()
   
  }

}
