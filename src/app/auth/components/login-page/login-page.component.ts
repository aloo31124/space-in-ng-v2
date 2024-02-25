import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

    
  constructor(    
    private router: Router
  ) {
    alert("請先登入");
    GoogleAuth.initialize({ grantOfflineAccess: true });
    //alert(GoogleAuth);
  }

  async clickSignIn() {
    try {      
      const user = await GoogleAuth.signIn();
      alert(user.email + " 成功登入!");
      if (user) {
        this.router.navigate(["home"]);
      }
    } catch (error) {
        console.log(error);
        alert(error);
    }
  }


}
