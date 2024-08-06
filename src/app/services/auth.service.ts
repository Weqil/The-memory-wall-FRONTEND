import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  authUser(form:object):any{
    return this.http.post('http://localhost:8000/api/login',form)
  }

  getUser():any
  {
    return this.http.get('http://localhost:8000/api/user')
  }
}
