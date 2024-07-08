import { HostListener, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) 
  {

  }
  
  public scrollYTemp:BehaviorSubject<number> = new BehaviorSubject<number>(0)
  public scrollY:BehaviorSubject<number> = new BehaviorSubject<number>(0)
  public checkScrollEdgeFunc!: ()=>void
  public scrollStart(){
    this.scrollYTemp.next(this.document.body.scrollTop)
    this.document.body.addEventListener('scroll', (event)=>{
      this.scrollY.next(this.document.body.scrollTop)
      this.checkScrollEdge(this.checkScrollEdgeFunc)
    });
  }

  public scrollEnd(){
    this.document.body.removeEventListener('scroll', ()=>{
      console.log('END SCROLL')  
    });
  }

checkScrollEdge(func:()=>void){
  if(func){
    let number = (this.document.body.offsetHeight) - this.document.body.offsetHeight/100 * 36
    let tempScrollY:number = this.scrollYTemp.value + number
    if(this.document.body.scrollTop > tempScrollY ){
      func()
      this.scrollYTemp.next(tempScrollY)
    
    }
  }
 
}

setCheckScrollEdge(func:()=>void):void{
  this.clearScroll()
  this.checkScrollEdgeFunc = func
}

clearScroll(){
  this.scrollYTemp.next(0)

}

}
