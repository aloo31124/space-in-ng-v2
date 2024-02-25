import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  isLoginIn = false;

  constructor(
    private router: Router
  ) { 
    // 初始
    GoogleAuth.initialize({ grantOfflineAccess: true });
  }

  isAuthenticated() {
    return this.isLoginIn;
  }


  async login() {
    // 登入判斷
    try {      
      const user = await GoogleAuth.signIn();
      alert(user.email + " 成功登入!");
      if (user) {
        this.isLoginIn = true;
        this.router.navigate(["home"]);
      }
    } catch (error) {
        console.log(error);
        alert(error);
    }
  }
}
