import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-drag-and-drop',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './drag-and-drop.component.html',
  styleUrl: './drag-and-drop.component.scss'
})
export class DragAndDropComponent {
  file:any
  files:File[] = []
  @Input() maxFileCount:number = 50
  @Input() types:any[] =['docx']
  getFile(event: any) {
    if(this.files.length < this.maxFileCount) {
      let tempArray:File[] = Array.from(event.target.files)
      tempArray.forEach((file:File)=>{
        if((this.types.indexOf(file.name.split('.').pop()) !== -1) && (this.files.map(elem=>elem.name).indexOf(file.name) == -1)) {
          this.files.push(file)
        }else{
          console.log('тип файла не подходит или файл уже загружен')
        }
      })
    }
  }

  dragenterFile(event: HTMLElement){
    event.style.background = '#777777';
  }
  dragenterFileLeave(event: HTMLElement){
    event.classList.remove('file-container_active')
    event.style.background = '';
  }
  
}
