import { Component, OnInit } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RouterLink } from '@angular/router';
import { VeteransService } from '../../services/veterans.service';
import { Route, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environments';
import { ScrollService } from '../../services/scroll.service';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-veteran-show',
  standalone: true,
  imports: [
    PdfViewerModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './veteran-show.component.html',
  styleUrl: './veteran-show.component.scss'
})
export class VeteranShowComponent implements OnInit  {
  constructor(
    private veteransService: VeteransService,
    private rout: ActivatedRoute,
    private scrollService: ScrollService
  )
   { 

   }
   public url:string = `${this.rout.snapshot.params['id']}.pdf`; 
 
  ngOnInit(): void {
   
  }
}
