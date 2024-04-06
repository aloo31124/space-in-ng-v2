import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthService } from '../../services/google-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    
  constructor(    
    private googleAuthService: GoogleAuthService
  ) { }

  ngOnInit(): void {
    alert("請先登入");
  }

  async clickSignIn() {
    this.googleAuthService.login();
    if(!this.googleAuthService.isAuthenticated() && this.googleAuthService.isLoginError()) {
      this.googleAuthService.getTestUser();
    }
  }


}
