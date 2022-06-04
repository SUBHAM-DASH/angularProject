import { AuthService } from './../../../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpform!: FormGroup;
  authValue = false;
  constructor(private fb: FormBuilder, private _auth: AuthService, private _router: Router) { }
  ngOnInit(): void {
    this.signUpform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })

    this._auth.authSubject.subscribe((res: any) => {
      this.authValue = res;
    })
  }
  onSubmit() {
    if (this.signUpform.valid) {
      if (!this.authValue) {
        console.log("login worked");

        this._auth.login(this.signUpform.value).subscribe((res: any) => {
          if(res.status =="success"){
            console.log(res);
            localStorage.setItem('token',res.token);
            this._router.navigate(['/products/allproduct']);
          }else{
            console.log(res);
            alert("Enter correct credentials");
            this.signUpform.reset();
          }
        })
      } else {
        console.log("Sign up worked");
        // console.log(this.signUpform.value);
        this._auth.signup(this.signUpform.value).subscribe((res: any) => {
          console.log(res);
          localStorage.setItem('token',res.token);
        })
        this._auth.signUpSuccessfully.next(false);
        this.signUpform.reset();
      }
    }
  }
}
