import { Component, ElementRef, HostListener, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Router, RouterLink } from '@angular/router';
import { VeteransService } from '../../services/veterans.service';
import { Route, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environments';
import { ScrollService } from '../../services/scroll.service';
import { IVeteran } from '../../models/veteran';
import { RouterOutlet } from '@angular/router';
import { catchError, of, Subject } from 'rxjs';
import { BackButtonComponent } from "../../components/back-button/back-button.component";
import { Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-veteran-show',
  standalone: true,
  imports: [
    PdfViewerModule,
    RouterLink,
    RouterOutlet,
    CommonModule,
    BackButtonComponent,
    NgClass
],
  templateUrl: './veteran-show.component.html',
  styleUrl: './veteran-show.component.scss'
})
export class VeteranShowComponent implements OnInit  {
  private readonly destroy$ = new Subject<void>()
  constructor(
    private veteransService: VeteransService,
    private rout: ActivatedRoute,
    private scrollService: ScrollService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private ngxUiLoaderService: NgxUiLoaderService
  )
   {

   }

   @Input() veteran!:IVeteran
   @Input() url!:string
   @ViewChild('scrollElement') scrollElement!:ElementRef
   @HostListener('document:click', ['$event'])
    onClick(event: MouseEvent): void {
      let target = event.target as HTMLElement
      if(target.className == 'document-modal__active' || target.className == 'close-img'){
        this.changeModal()
      }

    }
   public host:string = environment.backHost
   showDocumentModal:boolean = false
   public port:string = environment.backPort
   public protocol:string = environment.backProtocol
   documentModalImageUrl:string = ''
   avatarUrl:string = ''

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.veteran)
    if( this.veteran.photo){
      this.veteran.photo.includes('http') ? this.avatarUrl = this.veteran.photo : this.avatarUrl = this.protocol+'://'+this.host+':'+this.port + '/storage/' + this.veteran.photo 
   
    }else{
      this.veteran.rubrics[0].image.includes('http') ? this.avatarUrl = this.veteran.rubrics[0].image : this.protocol+'://'+this.host+':'+this.port+this.veteran.rubrics[0].image 
    }
    if(this.scrollElement && this.scrollElement.nativeElement){
      this.scrollElement.nativeElement.scrollTop = 0
    }
    //Возвращаю скролл после получения нового ветерана
    this.showDocumentModal = false
    //Если модалка с документом открыта - закрываю
  }
  setPlugAvatar(){

  }

  checkPhoto(url:string){
    let rightUrl = ''
    url.includes('http') ? this.avatarUrl = rightUrl = url : this.protocol + '://' + this.host+ ':' + this.port + '/storage/' + url
    return rightUrl
  }

  checkUrl(url:string){
    let formatingUrl = url
    url.includes('http') ? formatingUrl = url : formatingUrl = this.protocol+'://'+this.host+':'+this.port+ '/storage/' + url
    return formatingUrl
  }

  changeModal(){
    this.showDocumentModal =!this.showDocumentModal
  }
  setModalImageDocument(url:string){
    this.documentModalImageUrl = url
  }

  clearDescription(){
    return this.sanitizer.bypassSecurityTrustHtml(this.veteran.description)
  }

  ngOnInit(): void {
  
    // this.veteransService.getVeteranById(this.rout.snapshot.params['id']).pipe(
    //   catchError((err: Error) => {
    //     console.log(err)

    //     return of("Error:" + err.message)
    //   })
    // )
    // .subscribe((response: any) => {
    //   console.log(response)
    //   if (response.hero) {
    //     this.veteran = response.hero
    //     this.url = `${this.url}/${this.veteran.file_name}`
    //   } else {
    //     console.log(response)
    //   }
    // })
  }


}
