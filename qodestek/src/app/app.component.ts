import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  title = 'qodestek';
  logout: boolean = true;
  showHeaderData:any=false;
  btnSignupLogin: any = true;
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {


    this.btnSignupLogin = !this.btnSignupLogin;
    this._auth.authSubject.next(this.btnSignupLogin);
    this._router.events.subscribe((res) => {
      if (this._router.url === "/signup") {
        this.logout = true;
        this.showHeaderData = false;
      } else {
        this.logout = false;
        if(this._router.url == "/products/allproduct"){
          this.showHeaderData = true;
        }
      }
    });
    this._auth.signUpSuccessfully.subscribe((res)=>{
      this.btnSignupLogin = !this.btnSignupLogin;
      this._auth.authSubject.next(this.btnSignupLogin);
    })
  }
  getClickValue() {
    this.btnSignupLogin = !this.btnSignupLogin;
    this._auth.authSubject.next(this.btnSignupLogin)
  }
  logoutuser() {
    console.log("logout");
    this._auth.logoutUser();
  }

}
