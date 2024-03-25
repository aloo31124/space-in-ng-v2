import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/components/header/header.component';
import { ImgBtnComponent } from './common/button/components/img-btn/img-btn.component';
import { HomePageComponent } from './home/components/home-page/home-page.component';
import { LoginPageComponent } from './auth-route/components/login-page/login-page.component';
import { CalendarPickerComponent } from './common/time/component/calendar-picker/calendar-picker.component';
import { ClockPickerComponent } from './common/time/component/clock-picker/clock-picker.component';
import { BookingDatePageComponent } from './booking/components/booking-date-page/booking-date-page.component';
import { BookingClockPageComponent } from './booking/components/booking-clock-page/booking-clock-page.component';
import { BookingSelectTypePageComponent } from './booking/components/booking-select-type-page/booking-select-type-page.component';
import { BookingCheckFormPageComponent } from './booking/components/booking-check-form-page/booking-check-form-page.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { PaidPlanListComponent } from './payment/components/paid-plan-list/paid-plan-list.component';
import { EcpayFormComponent } from './payment/components/ecpay-form/ecpay-form.component';
import { ReviewRoomTrendComponent } from './review-room/components/review-room-trend/review-room-trend.component';
import { ReviewRoomRemanetRateComponent } from './review-room/components/review-room-remanet-rate/review-room-remanet-rate.component';
import { ReviewBookingCalendarComponent } from './review-booking/components/review-booking-calendar/review-booking-calendar.component';
import { ReviewBookingFormComponent } from './review-booking/components/review-booking-form/review-booking-form.component';
import { DialogComponent } from './common/dialog/components/dialog/dialog.component';
import { WordShrotenPipe } from './common/pipe/word-shroten.pipe';
import { InputComponent } from './common/input/components/input/input.component';
import { DateToDayOfWeekPipe } from './common/pipe/date-to-day-of-week.pipe';
import { LoadingBasicComponent } from './common/loading/components/loading-basic/loading-basic.component';


const  firebase = {
  projectId: 'spacein-ec8ab',
  appId: '1:328066296243:web:b1897c1201a0f9b55843c6',
  databaseURL: 'https://spacein-ec8ab-default-rtdb.firebaseio.com',
  storageBucket: 'spacein-ec8ab.appspot.com',
  apiKey: 'AIzaSyDKF1CmT6ugm2WYk8mgRzyPQy8-AsBAgvs',
  authDomain: 'spacein-ec8ab.firebaseapp.com',
  messagingSenderId: '328066296243',
  measurementId: 'G-54HYGJ7ZDQ',
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImgBtnComponent,
    HomePageComponent,
    LoginPageComponent,
    CalendarPickerComponent,
    ClockPickerComponent,
    BookingDatePageComponent,
    BookingClockPageComponent,
    BookingSelectTypePageComponent,
    BookingCheckFormPageComponent,
    PaidPlanListComponent,
    EcpayFormComponent,
    ReviewRoomTrendComponent,
    ReviewRoomRemanetRateComponent,
    ReviewBookingCalendarComponent,
    ReviewBookingFormComponent,
    DialogComponent,
    WordShrotenPipe,
    InputComponent,
    DateToDayOfWeekPipe,
    LoadingBasicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

       
    provideFirebaseApp(() => initializeApp(firebase)),
    provideFirestore(() => getFirestore()), 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
