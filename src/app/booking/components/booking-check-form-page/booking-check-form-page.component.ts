import { Component } from '@angular/core';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAuthService } from 'src/app/auth/services/google-auth.service';
import { GoogleAuthUser } from 'src/app/auth/models/google-auth-user.model';

@Component({
  selector: 'app-booking-check-form-page',
  templateUrl: './booking-check-form-page.component.html',
  styleUrls: ['./booking-check-form-page.component.scss']
})
export class BookingCheckFormPageComponent {

  selectDate = "";
  selectDay = "";
  selectTime = "";
  bookingType = "";
  currentUser!: GoogleAuthUser;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private googleAuthService: GoogleAuthService,
  ) {
  }

  ngOnInit(): void {
    // 取得使用者資訊
    this.currentUser = this.googleAuthService.getCurrentUser();
    if(!this.currentUser) {
      alert("無法取得使用者資訊，請重新登入。");
      this.router.navigate(["/"]);
    }

    // 提取日期参数
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectDate = params['selectDate'];
      this.selectTime = params['selectTime'];
      this.bookingType = params['bookingType'];

      const dayOfWeek = (new Date(this.selectDate)).getDay();
      //判斷星期
      switch(dayOfWeek) {        
        case 0:
          // 星期日
          this.selectDay = "(日)";
          break;
        case 1:
          // 星期一
          this.selectDay = "(一)";
          break;
        case 2:
          // 星期二
          this.selectDay = "(二)";
          break;
        case 3:
          // 星期三
          this.selectDay = "(三)";
          break;
        case 4:
          // 星期四
          this.selectDay = "(四)";
          break;
        case 5:
          // 星期五
          this.selectDay = "(五)";
          break;
        case 6:
          // 星期六
          this.selectDay = "(六)";
          break;
      }
    });
  }

  submitBooking() {

    if(!this.currentUser) {
      alert("使用者資訊不足，請重新登入");
      return;
    }

    if(this.currentUser.email === "") {
      alert("無法取得使用者 email，請重新登入");
      return;
    }

    if(this.currentUser.id === "") {
      alert("無法取得使用者 id ，請重新登入");
      return;
    }

    const bookingData = { 
      userId: this.currentUser.id, 
      mail: this.currentUser.email, 
      startDate: this.selectDate, 
      endDatae: this.selectDate, 
      startTime: this.selectTime,
      endTime: this.selectTime,
      bookingType: this.bookingType,
      room: "",
      site: "",
    };
    
    //Function addDoc() called with invalid data. Data must be an object, but it was: a custom Booking object 
    //let bookingData = new Booking();
    //bookingData.mail = googleAuthUser.email;
    //bookingData.selectDate = this.selectDate;
    //bookingData.selectTime = this.selectTime;
    //bookingData.bookingType = this.bookingType;

    console.log(bookingData);

    this.bookingService.post(bookingData)      
      .then(() => {
        alert("送出成功, 預約時間: " + this.selectDate + " " + this.selectTime);
        this.router.navigate(["home"]);
      })
      .catch((error) => {
        console.log(error);
        alert("資料送出失敗,請重新輸入");
      });
    alert("資料傳輸中");
  }

  selectMap() {
    this.router.navigate(["map"]);
  }
}
