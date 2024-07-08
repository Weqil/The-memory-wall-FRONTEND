import { Component } from '@angular/core';
import { DragAndDropComponent } from '../../components/drag-and-drop/drag-and-drop.component';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    DragAndDropComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

}
