import { Component, OnInit } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RouterLink } from '@angular/router';
import { VeteransService } from '../../services/veterans.service';
import { Route, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environments';
@Component({
  selector: 'app-veteran-show',
  standalone: true,
  imports: [
    PdfViewerModule,
    RouterLink,

  ],
  templateUrl: './veteran-show.component.html',
  styleUrl: './veteran-show.component.scss'
})
export class VeteranShowComponent {
  constructor(
    private veteransService: VeteransService,
    private rout: ActivatedRoute
  )
   { }
   public url:string = `${environment.backProtocol}://${environment.backHost}:${environment.backPort}/storage/files/${this.rout.snapshot.params['id']}.pdf`; 
 
  
}
