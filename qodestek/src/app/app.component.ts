import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  title = 'qodestek';
  btnSignupLogin:any=true;
  constructor(private _auth:AuthService){ }

  ngOnInit(): void {
    this.btnSignupLogin=!this.btnSignupLogin;
    this._auth.authSubject.next(this.btnSignupLogin)
  }
  getClickValue(){
    this.btnSignupLogin=!this.btnSignupLogin;
    this._auth.authSubject.next(this.btnSignupLogin)
  }

}
