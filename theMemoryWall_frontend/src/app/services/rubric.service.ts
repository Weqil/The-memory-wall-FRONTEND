import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {provideHttpClient} from '@angular/common/http';
import { environment } from '../../environments/environments';
import { IQuery } from '../models/query';
import { IVeteran } from '../models/veteran';
@Injectable({
  providedIn: 'root'
})
export class RubricService {

  constructor(
    private http: HttpClient,
  ) {
   
   }
   getRubric(params: IQuery) {
    // return this.http.get<any>(`${environment.backProtocol}://${environment.backHost}:${environment.backPort}/api/hero`, { params: { ...params } }); 
    return this.http.get<any>(`${environment.backProtocol}://${environment.backHost}:${environment.backPort}/api/rubrics`); 
   }
}
