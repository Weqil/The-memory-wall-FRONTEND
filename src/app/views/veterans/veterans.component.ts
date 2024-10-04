import { ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnInit,ViewChild,inject } from '@angular/core';
import { Routes, RouterModule,RouterLink, RouterLinkActive, ActivatedRoute, provideRouter } from '@angular/router';
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
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { IRubrics } from '../../models/rubrics';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RubricService } from '../../services/rubric.service';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { BackButtonComponent } from "../../components/back-button/back-button.component";
import { RouteReuseStrategy } from '@angular/router';
import { VeteranShowComponent } from '../veteran-show/veteran-show.component';
import { environment } from '../../../environments/environments';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivityService } from '../../services/activity.service';
@Component({
  selector: 'app-veterans',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    RouterOutlet,
    CommonModule,
    CardGridComponent,
    LetterComponent,
    ReactiveFormsModule,
    VeteranShowComponent,
    NgxUiLoaderModule,
   
    BackButtonComponent
],
  providers: [
    VeteransService,
  ],
  templateUrl: './veterans.component.html',
  styleUrl: './veterans.component.scss'
})


export class VeteransComponent  implements OnInit {
  private readonly destroy$ = new Subject<void>()
    constructor(
      private cdr: ChangeDetectorRef,
      @Inject(DOCUMENT) private document: Document,
      private scrollService:ScrollService,
      private route:ActivatedRoute,
      private queryBuilderService: QueryBuilderService,
      private filterService: FilterService,
      private rubricService: RubricService,
      private ngxUiLoaderService: NgxUiLoaderService,
      private activityService: ActivityService,
    
    ){}

    @ViewChild('test') test!:ElementRef
    public veteransService:VeteransService = inject(VeteransService);
    public veteranArray:IVeteran[] = [];
    public letterArray: string[] = 'А Б В Г Д Е Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Э Ю Я'.split(' ');
    public waitRequest: boolean = false;
    public keyboard: any;
    public rubric!:IRubrics
    public wait: boolean = true;
    public notFound: boolean = false;
    public value = "";
    public letterActive: string = '';
    public veteransShowUrl:string = this.route.snapshot.params['id']
    public greekLayout:any = {}
    public formSearch!: FormGroup
    public veteranShowId!:number
    public veteranShowHero!:IVeteran
    public host:string = environment.backHost
    public port:string = environment.backPort
    public protocol:string = environment.backProtocol
    public url!:string
    
    ngAfterViewInit() {
      this.keyboard = new Keyboard({
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button)
      })
      this.keyboard.setOptions({
        layout: {
          default: [
            'Ё Й Ц У К Е Н Г Ш Щ З Х Ъ {bksp}',
            'Ф Ы В А П Р О Л Д Ж Э',
            'Я Ч С М И Т Ь Б ю',
           
          ],
        },
        display: {
          "{alt}": ".?123",
          "{smileys}": "\uD83D\uDE03",
          "{shift}": "⇧",
          "{shiftactivated}": "⇧",
          "{enter}": "return",
          "{bksp}": "СТЕРЕТЬ",
          "{altright}": ".?123",
          "{downkeyboard}": "🞃",
          "{space}": " ПРОБЕЛ ",
          "{default}": "ABC",
        }
      })

    }

    onInputChange = (event: any) => {
      if(this.formSearch.value.name == '') {
        this.filterService.setFullName('')
        this.requestTemplate()
        this.getVeteransByRubricId()
      }
      this.value = this.formSearch.value.name
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

  searchVeteranName(){
    this.filterService.setFullName(this.value)
    this.filterService.setLetter('')
    this.requestTemplate()
    this.getVeteransByRubricId()
    // делаю запрос с новым фильтром задаю его в функции для ввода имени с клавиатуры
  }


  clearButton(){
    this.veteranArray.length = 0
    this.queryBuilderService.setPaginateVeterans('')
    this.filterService.setFullName('')
    this.value = ''
    this.formSearch.patchValue({
     name: ''
    });
   this.keyboard.setInput('');
   this.filterService.setLetter(String(''));
   this.filterService.changeFilter.next(true)
  }

  getVeteransByRubricId(){
    if (this.wait) {
      this.ngxUiLoaderService.startBackgroundLoader('loader-03')
      if(localStorage.getItem('rubric')){
        this.wait = false
        //Добавил проверку для того что бы не было багов с пустым локал сторедж
          this.veteransService.getVeteransByRubricId(this.queryBuilderService.quertyBuilder('veteransForPage')).pipe(takeUntil(this.destroy$)).subscribe((res:any)=>{
            this.ngxUiLoaderService.stopBackgroundLoader('loader-03')
          this.ngxUiLoaderService.stop()
          this.veteranArray.push(...res.heroes.data);
          if(this.veteranArray.length == 0){
            this.notFound = true
          }else{
            this.notFound = false
          }
          this.wait = !this.wait
          this.queryBuilderService.setPaginateVeterans(res.heroes.next_cursor)
        })
      } else{
        this.wait = false
        this.filterService.setRubricIds(this.veteransShowUrl)
        this.veteransService.getVeteransByRubricId(this.queryBuilderService.quertyBuilder('veteransForPage')).pipe().subscribe((res:any)=>{
          this.ngxUiLoaderService.stop()
          this.veteranArray.push(...res.heroes.data);
          this.wait = !this.wait
          this.queryBuilderService.setPaginateVeterans(res.heroes.next_cursor)
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

  clearLetter(){
  this.veteranArray.length = 0
  this.queryBuilderService.setPaginateVeterans('')
  this.filterService.setFullName('')
  this.value = ''
  this.formSearch.patchValue({
    name: ''
  });
  this.keyboard.setInput('');
  this.filterService.setLetter('');
  this.filterService.changeFilter.next(true)
  }
  changeLetter(event?: Event|string){
  this.veteranArray.length = 0
  this.queryBuilderService.setPaginateVeterans('')
  this.filterService.setFullName('')
  this.value = ''
  this.formSearch.patchValue({
    name: ''
  });
  this.keyboard.setInput('');
  this.filterService.setLetter(String(event));
  this.filterService.changeFilter.next(true)

  }

  paginateSubmit(){
      if(this.queryBuilderService.paginateVeterans.value){
        this.filterService.changeFilter.next(true)
      }
  }
  hideShow(content:HTMLElement){
    content.style.transition = '0.3s'
    content.style.transform = 'translate(100vw)'
    setTimeout(()=>{
      content.style.display = 'none'
    },300)
 
  }
  openVeteranShow(event:any, content:HTMLElement){
    this.ngxUiLoaderService.start()
    this.veteranShowId = event
    this.veteransService.getVeteranById(event).pipe(
      catchError((err: Error) => {
    
        return of("Error:" + err.message)
      })
    )
    .subscribe((response: any) => {
      this.ngxUiLoaderService.stop()

      if (response.heroes) {
        this.veteranShowHero = response.heroes
        this.url = `${this.protocol}://${this.host}:${this.port}/api/files/pdf/${this.veteranShowHero.file_name}`
        content.style.display = 'block'
        setTimeout(()=>{
        content.style.transition = '0.3s'
        content.style.transform = 'translate(0vw)'
        },300)
      } else {
      }
    })
  
   
   
  }
  getRubric(){
    this.rubricService.getRubricById(this.veteransShowUrl).pipe().subscribe((res:any)=>{
    this.rubric = res.rubric
    })
  }
  ngOnInit(): void {
    if(!this.activityService.showPlug.value && this.veteranArray.length == 0){
      console.log(this.veteranArray)
      this.ngxUiLoaderService.start()
    }
    this.getRubric()
    this.scrollService.scrollStart()
    this.paginateSubmit()

    // console.log(this.veteranArray)
    this.formSearch = new FormGroup({
      name:new FormControl('')
    })
    this.filterService.changeFilter.pipe(takeUntil(this.destroy$)).subscribe((res:any)=>{
      this.letterActive = this.filterService.getLetter()

      this.getVeteransByRubricId()
      // this.cdr.detectChanges()
    })

  }
  ngOnDestroy(): void {
    this.filterService.setFullName('')
    this.filterService.setLetter('')
    this.queryBuilderService.setPaginateVeteransValue(true)
    this.queryBuilderService.setPaginateVeterans('')
    this.veteranArray.length = 0
    this.destroy$.next()
    this.destroy$.complete()
    this.scrollService.scrollEnd()
  }

}
