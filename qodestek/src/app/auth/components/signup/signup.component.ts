import { AuthService } from './../../../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpform!:FormGroup;
  authValue=false;
  constructor(private fb:FormBuilder,private _auth:AuthService) { }
  ngOnInit(): void {
    this.signUpform=this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })

    this._auth.authSubject.subscribe((res:any)=>{
      this.authValue=res;
    })
  }
  getAuthValue(){
    console.log(this.signUpform.value);
    if(!this.authValue){
      console.log("log in work");
    }else{
      console.log("Sign up worked");
    }
  }
}
