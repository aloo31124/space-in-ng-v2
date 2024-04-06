import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { GoogleAuthUser } from '../models/google-auth-user.model';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private isLoginIn = false;
  private currentUser!: GoogleAuthUser;

  constructor(
    private router: Router
  ) { 
    // 初始
    GoogleAuth.initialize({
      clientId: '328066296243-5opekodfa93rria1e8utcql4rkrbvktq.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });
  }

  isAuthenticated() {
    return this.isLoginIn;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  /*
   * 登入 
   */
  async login() {
    // 登入判斷
    try {   
      const user = await GoogleAuth.signIn();
      this.currentUser = user;
      console.log(user);
      if (user) {
        alert(user.email + " 成功登入!");
        this.isLoginIn = true;
        this.router.navigate(["home"]);
      }
      else {
        alert("無法取得使用者資訊");
      }
    } catch (error) {
        console.log(error);
        alert("發生錯誤！錯誤訊息為: " + error);
    }

    if(!this.isLoginIn) {
      this.currentUser = {
        id: "testid",
        name: "testname",
        email: "tesetmail@testmail.com",
        imageUrl: "testurl",
        authentication: {},
      }
      alert("因無法取得使用者資訊, 轉為測試帳號: " + this.currentUser.email);
      this.isLoginIn = true;
      this.router.navigate(["home"]);
    }

  }

  /*
   * 登出 
   */
  logout() {
    GoogleAuth.signOut();
    this.currentUser = new GoogleAuthUser();
    this.isLoginIn = false;
  }
}
