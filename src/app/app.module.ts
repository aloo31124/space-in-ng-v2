import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/components/header/header.component';
import { ImgBtnComponent } from './common/button/components/img-btn/img-btn.component';
import { HomePageComponent } from './home/components/home-page/home-page.component';
import { LoginPageComponent } from './auth/components/login-page/login-page.component';
import { CalendarPickerComponent } from './common/time/component/calendar-picker/calendar-picker.component';
import { ClockPickerComponent } from './common/time/component/clock-picker/clock-picker.component';
import { BookingDatePageComponent } from './booking/components/booking-date-page/booking-date-page.component';
import { BookingClockPageComponent } from './booking/components/booking-clock-page/booking-clock-page.component';
import { BookingSelectTypePageComponent } from './booking/components/booking-select-type-page/booking-select-type-page.component';
import { BookingCheckFormPageComponent } from './booking/components/booking-check-form-page/booking-check-form-page.component';

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
    BookingCheckFormPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
