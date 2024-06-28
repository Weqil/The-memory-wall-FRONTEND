import { Component } from '@angular/core';
import { Routes, RouterModule,RouterLink } from '@angular/router';
@Component({
  selector: 'app-memory-people',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink
  ],
  templateUrl: './memory-people.component.html',
  styleUrl: './memory-people.component.scss'
})
export class MemoryPeopleComponent {

}
