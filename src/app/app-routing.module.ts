import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/components/home-page/home-page.component';
import { LoginPageComponent } from './auth/components/login-page/login-page.component';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { BookingDatePageComponent } from './booking/components/booking-date-page/booking-date-page.component';
import { BookingClockPageComponent } from './booking/components/booking-clock-page/booking-clock-page.component';
import { BookingSelectTypePageComponent } from './booking/components/booking-select-type-page/booking-select-type-page.component';
import { BookingCheckFormPageComponent } from './booking/components/booking-check-form-page/booking-check-form-page.component';
import { PaidPlanListComponent } from './payment/components/paid-plan-list/paid-plan-list.component';
import { EcpayFormComponent } from './payment/components/ecpay-form/ecpay-form.component';
import { ReviewRoomOverviewComponent } from './review-room/components/review-room-overview/review-room-overview.component';
import { ReviewRoomDetailComponent } from './review-room/components/review-room-detail/review-room-detail.component';

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
  },
  {
    path: 'review-room-overview',
    component: ReviewRoomOverviewComponent,
  },
  {
    path: 'review-room-detail',
    component: ReviewRoomDetailComponent,
  },
  {
    path: 'payment',
    component: PaidPlanListComponent,
  },
  {
    path: 'ecpay-form',
    component: EcpayFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
