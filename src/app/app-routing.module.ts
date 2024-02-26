import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/components/home-page/home-page.component';
import { LoginPageComponent } from './auth/components/login-page/login-page.component';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { BookingDatePageComponent } from './booking/components/booking-date-page/booking-date-page.component';
import { BookingClockPageComponent } from './booking/components/booking-clock-page/booking-clock-page.component';
import { BookingSelectTypePageComponent } from './booking/components/booking-select-type-page/booking-select-type-page.component';
import { BookingCheckFormPageComponent } from './booking/components/booking-check-form-page/booking-check-form-page.component';

const routes: Routes = [
  {path:'', component: LoginPageComponent},
  {
    path:'home', 
    canActivate: [AuthGuardService],    // 檢查 父路由。
    component: HomePageComponent,
  },
  {
    path: 'booking-date',
    component: BookingDatePageComponent,
  },
  {
    path: 'booking-clock',
    component: BookingClockPageComponent,
  },
  {
    path: 'booking-select-type',
    component: BookingSelectTypePageComponent,
  },
  {
    path: 'booking-check-form',
    component: BookingCheckFormPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
