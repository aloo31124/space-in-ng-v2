import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/components/home-page/home-page.component';
import { LoginPageComponent } from './auth/components/login-page/login-page.component';
import { AuthGuardService } from './auth/services/auth-guard.service';

const routes: Routes = [
  {path:'', component: LoginPageComponent},
  {
    path:'home', 
    canActivate: [AuthGuardService],    // 檢查 父路由。
    component: HomePageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
