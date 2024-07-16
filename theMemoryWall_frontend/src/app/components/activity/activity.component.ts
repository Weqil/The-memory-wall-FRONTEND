import { Component, HostListener } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    let target = event.target as HTMLElement
    console.log('click')

  }
}
