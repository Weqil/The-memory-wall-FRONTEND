import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import {provideHttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
  
})
export class VeteransService {

  constructor(
    private http: HttpClient,

  ) { }
  getVeterans(searchString: string) {
    console.log(searchString);
    return this.http.get(`${environment.backProtocol}://${environment.backHost}:${environment.backPort}/api/hero?full_name= ${searchString}`); 
  }
}
