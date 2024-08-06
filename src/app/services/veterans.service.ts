import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import {provideHttpClient} from '@angular/common/http';
import { IQuery } from '../models/query';
@Injectable({
  providedIn: 'root'

})
export class VeteransService {

  constructor(
    private http: HttpClient,

  ) { }

  getVeteranById(id: number) {
    return this.http.get(`${environment.backProtocol}://${environment.backHost}:${environment.backPort}/api/hero/${id}`);

  }
  getVeterans(searchString: string) {
  
    return this.http.get(`${environment.backProtocol}://${environment.backHost}:${environment.backPort}/api/hero?full_name= ${searchString}`);
  }

  getVeteransByRubricId(params: IQuery){
    return this.http.get<any>(`${environment.backProtocol}://${environment.backHost}:${environment.backPort}/api/hero`, { params: { ...params } });
  }
}
