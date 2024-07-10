import { Component, OnInit } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Router, RouterLink } from '@angular/router';
import { VeteransService } from '../../services/veterans.service';
import { Route, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environments';
import { ScrollService } from '../../services/scroll.service';
import { IVeteran } from '../../models/veteran';
import { RouterOutlet } from '@angular/router';
import { catchError, of } from 'rxjs';

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
    private scrollService: ScrollService,
    private router: Router,
  )
   {

   }

   public veteran!:IVeteran

   public host:string = environment.backHost
   public port:string = environment.backPort
   public protocol:string = environment.backProtocol

   public url:string = `assets/pdfs/`;

  ngOnInit(): void {
    this.veteransService.getVeteranById(this.rout.snapshot.params['id']).pipe(
      catchError((err: Error) => {
        console.log(err)

        return of("Error:" + err.message)
      })
    )
    .subscribe((response: any) => {
      if (response.heroes) {
        this.veteran = response.heroes
        this.url = `${this.url}/${this.veteran.file_name}.pdf`
      } else {
        this.router.navigate([`home`]);
      }
    })
  }


}
