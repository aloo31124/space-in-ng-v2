import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { GoogleAuthUser } from '../models/google-auth-user.model';
import { UserService } from 'src/app/common/user/services/user-service.service';
import { User } from 'src/app/common/user/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private isLoginIn = false;
  private currentUser!: GoogleAuthUser;

  constructor(
    private router: Router,
    private userService: UserService,
  ) { 
    // 於此取得初始資料
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
    const user = await GoogleAuth.signIn();
    if(user["email"]) {
      this.userService
        .getUserIdByMail(user["email"])
        .then(doc => {

          const newUser = {
            userFirestoreId: doc.docs[0]._key.path.segments[6],
            ...user,
          }
          this.currentUser = new GoogleAuthUser(newUser);
          console.log(this.currentUser);
          if (user) {
            alert(user.email + " 成功登入!");
            this.isLoginIn = true;
            this.router.navigate(["home"]);
          }
          else {
            alert("無法取得使用者資訊");
          }
        });
    }

    // 等待超過 7秒, 使用測試帳號登入
    setTimeout(()=> {
      if(!this.currentUser) {
        this.getTestUserInfo();
      }
    }, 7000);
  }

  /*
   * 登出 
   */
  logout() {
    GoogleAuth.signOut();
    this.currentUser = new GoogleAuthUser({});
    this.isLoginIn = false;
  }


  /*
   * 取得測試登入帳號 
   */
  getTestUserInfo() {
    this.currentUser = new GoogleAuthUser({
      id: "testid",
      name: "testname",
      email: "tesetmail@testmail.com",
      imageUrl: "testurl",
      authentication: {},
    });
    alert("因無法取得使用者資訊, 轉為測試帳號: " + this.currentUser.email);
    this.isLoginIn = true;
    this.router.navigate(["home"]);
  }
    

}
