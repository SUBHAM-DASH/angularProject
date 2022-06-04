import { HttpClient } from '@angular/common/http';
import { config } from './config';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject = new Subject();
  url = config.API_URL;
  signUpSuccessfully = new Subject();
  constructor(private http: HttpClient,private _router:Router) { }

  signup(data:any){
    return this.http.post(this.url+"/api/user/register",data);
  }

  login(data:any){
    return this.http.post(this.url+"/api/user/loginuser",data);
  }

  checkToken(){
    return !! localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['/signup']);
  }
}
