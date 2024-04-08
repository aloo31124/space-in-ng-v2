import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { GoogleAuthUser } from '../models/google-auth-user.model';
import { UserService } from 'src/app/common/user/services/user-service.service';

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
   * 登出 
   */
  logout() {
    GoogleAuth.signOut();
    this.currentUser = new GoogleAuthUser({});
    this.isLoginIn = false;
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
          console.log(doc.docs[0]);
          if(!doc.docs[0]) {
            this.registerUserForFirstLogin(doc, user);
          } else {
            this.setCurrentUser(doc, user);
            this.checkLogin(user);
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
   * google auth 成功,
   * 且首次登入, 註冊進 firestore user 表 
   * 依照 email 新增一筆
   */
  registerUserForFirstLogin(doc: any, user: any) {
    this.userService
      //.addUser(new GoogleAuthUser(user))
      .addUser(user)
      .then(() => {
        alert("首次 google 授權, 註冊成功, 請再次登入");
        //this.setCurrentUser(doc, user);
        this.router.navigate(["/"]);
      });
  }

  /*
   * 取得 userFirestoreId 並設定 current user
   */
  setCurrentUser(doc:any, user:any) {
    const userFirestoreId = doc.docs[0]._key.path.segments[6];
    const newUser = {
      userFirestoreId: userFirestoreId,
      ...user,
    }
    this.currentUser = new GoogleAuthUser(newUser);
  }
  
  /*
   * 檢查是否成功登入 
   */
  checkLogin(user: any) {
    console.log(this.currentUser);
    if (this.currentUser) {
      alert(user.email + " 成功登入!");
      this.isLoginIn = true;
      this.router.navigate(["home"]);
    }
    else {
      alert("無法取得使用者資訊");
    }
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
