import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ReviewBookingService } from '../../services/review-booking.service';
import { Booking } from 'src/app/booking/models/booking.model';
import { RouteUrlRecordService } from 'src/app/common/header/services/route-url-record.service';

@Component({
  selector: 'app-review-booking-calendar',
  templateUrl: './review-booking-calendar.component.html',
  styleUrls: ['./review-booking-calendar.component.scss']
})
export class ReviewBookingCalendarComponent {

  currentDate = new Date();
  currentYear = 0;
  currentMonth = 0;
  currentMonthAllDay = 0;
  currentMonthFirstDay?: Date;
  currentMonthFirstDayWeekly = 0;
  displayAllDayGrid = 0
  _selectDate = 1;

  // 當前使用者 booking 之日期
  bookingDateList = new Array<Booking>();
  
  
  constructor(
    private routeUrlRecordService: RouteUrlRecordService,
    private reviewBookingService: ReviewBookingService,
  ) { }

  ngOnInit(): void {
    //取得當前日期
    this.currentDate = new Date(); 

    //取得當前年月
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth() + 1; //月份從0開始算，後續計算需加1
    this.setCalendarDateInfo();
    this.setBookingDotDate();
  }


  /* 
   * 初始、切換月份後重取月份資訊。
   */
  setCalendarDateInfo() {
    //取得當前月份總日數
    this.currentMonthAllDay = new Date(this.currentYear, this.currentMonth , 0).getDate();

    //當前月份首日星期
    this.currentMonthFirstDay = new Date(this.currentYear, this.currentMonth - 1, 1);
    this.currentMonthFirstDayWeekly = this.currentMonthFirstDay.getDay();
    
    //需要呈現之日期格子數
    this.displayAllDayGrid = this.currentMonthAllDay + this.currentMonthFirstDayWeekly;
  }


  /* 
   * 從 FireStore 取得所有 booking 日期。
   */
  setBookingDotDate() {
    // 取得已選擇 日期 (尚未依照 email 搜尋)

    const startDate = new Date(this.currentYear + '-' + this.currentMonth + '-01');
    const endDate = new Date(this.currentYear + '-' + this.currentMonth + '-' + this.currentMonthAllDay);

    this.reviewBookingService
      .getAllBookingDayByUserId()
      .subscribe((responseData) => {
        responseData
          .filter(data => { 
            const checkDate = new Date(data['startDate']);
            return ( startDate <= checkDate && checkDate <= endDate);
          }) 
          .forEach(x => {
            this.bookingDateList.push(new Booking(
              x["fireStoreId"],
              x["userId"],
              x["mail"],
              x["startDate"],
              x["endDatae"],
              x["startTime"],
              x["endTime"],
              x["bookingType"],
              x["roomId"],
              x["roomName"],
              x["siteId"],
              x["siteName"],
            ));
          });
      });
  }

  /* 
   * 確認該日是否已被 booking，顯示 紫色小點 dot
   */
  isShowDot(checkDay: number): boolean {
    return this.isIncloudCount(checkDay) > 0;
  }

  /*
   * 計算該日期(數字) 包含次數 
   */
  isIncloudCount(checkNumber: number) {
    let dotCount = 0;
    this.bookingDateList
      .forEach(booking => {
        if((new Date(booking.startDate)).getDate() === checkNumber ) {
          dotCount ++;
        }
      });
    return dotCount;
  }


  /* 
   * 上個月。
   */
  backMonth() {
    this.currentMonth =this.currentMonth - 1;
    this.checkMonth();
    this.setCalendarDateInfo();
    this.setBookingDotDate();
    this._selectDate = 1;
  }


  /* 
   * 下個月。
   */
  nextMonth() {
    this.currentMonth =this.currentMonth + 1;
    this.checkMonth();
    this.setCalendarDateInfo();    
    this.setBookingDotDate();
    this._selectDate = 1;
  }

  /*
   * 確認月份若非 1 <= month <= 12，則切換年分。
   */
  checkMonth() {
    if(1 <= this.currentMonth && this.currentMonth <= 12) {
      return;
    }

    if(this.currentMonth < 1) {
      this.currentMonth = 12;
      this.currentYear = this.currentYear - 1;   
      return;   
    }

    if(this.currentMonth > 12) {
      this.currentMonth = 1;
      this.currentYear = this.currentYear + 1;   
      return;   
    }
  }


  /* 
   * 選擇日期,檢視細節並評估是否刪除
   */
  selectDate(date: number) {

    if(this.isIncloudCount(date) === 0) {
      return;
    }

    if(date > 0) {
      this._selectDate = date;
    }

    this.bookingDateList
      .forEach(booking => {
        // 後續要改成id @_@
        if(new Date(booking.startDate).getDate() === date) {
          // 建立 NavigationExtras 對象
            const navigationExtras: NavigationExtras = {
              queryParams: {                
                fireStoreId: booking.fireStoreId,
                selectDate: booking.startDate,
                selectTime: booking.startTime,
                bookingType: booking.bookingType,
              }
            };
          this.routeUrlRecordService.nextPage("review-booking-form", navigationExtras);
        }
      });
  }

}
