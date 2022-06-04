import { HttpInterceptor } from '@angular/common/http';
import { Injectable,Injector } from '@angular/core';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector,private _auth:AuthService) { }

  intercept(req:any,next:any){
    let tokenzedRequest = req.clone({
      setHeaders :{
        Authorization : `Bearer ${this._auth.getToken()}`
      }
    })
    return next.handle(tokenzedRequest);
  }
}
