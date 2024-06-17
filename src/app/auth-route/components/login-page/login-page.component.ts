import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthService } from '../../services/google-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  account = "";
  password = "";

    
  constructor(    
    private googleAuthService: GoogleAuthService
  ) { }

  ngOnInit(): void {
    alert("請先登入");
  }

  async clickSignIn() {
    this.googleAuthService.loginByGoogle();
  }

  clickLogin() {
    //console.log("登入資訊: ", this.account, this.password)
    this.googleAuthService.loginTestAccount(this.account, this.password);
  }


}
