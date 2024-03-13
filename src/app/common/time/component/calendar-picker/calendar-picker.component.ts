import { Component, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { BookingService } from 'src/app/booking/services/booking.service';
import { Booking } from 'src/app/booking/models/booking.model';

@Component({
  selector: 'app-calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.scss']
})
export class CalendarPickerComponent {


  // 該日期元件選擇年月日
  @Output() selectDatInfo = new EventEmitter<string>();

  currentDate = new Date();
  currentYear = 0;
  currentMonth = 0;
  currentMonthAllDay = 0;
  currentMonthFirstDay?: Date;
  currentMonthFirstDayWeekly = 0;
  displayAllDayGrid = 0

  _selectDate = 1;
  bookingList = new Array<Booking>();
  //該天 booking 幾次
  thisDayBookingList = new Array<Booking>();
  
  
  constructor(
    private bookingService: BookingService,
  ) { }

  ngOnInit(): void {
    //取得當前日期
    this.currentDate = new Date();
    this._selectDate = this.currentDate.getDate();

    //取得當前年月
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth() + 1; //月份從0開始算，後續計算需加1
    this.setCalendarDateInfo();
    this.setBookingDotDate();
    this.emitDateInfo();
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

    this.bookingService
      .getAll()
      .subscribe(bookingList => {
        bookingList
          .forEach(booking => {
            this.bookingList.push(new Booking(
              booking["fireStoreId"],
              booking["userId"],
              booking["mail"],
              booking["startDate"],
              booking["endDatae"],
              booking["startTime"],
              booking["endTime"],
              booking["bookingType"],
              booking["roomId"],
              booking["roomName"],
              booking["siteId"],
              booking["siteName"],
            ));
          });
      });

  }

  /*
   * 計算該日期(數字) 包含次數 
   */
  countDot(checkDateNumber: number) {
    if(checkDateNumber <= 0){
      return 0;
    }
    const checkDate = new Date(this.currentYear, this.currentMonth - 1, checkDateNumber);
    const filterBooking = this.bookingList
      .filter(booking => {
        return (new Date(booking.startDate).getTime() === checkDate.getTime());
      });
    this.thisDayBookingList = filterBooking;
    return filterBooking.length;
  }

  /*
   * 確認當天 借用 dot 的顏色 (教室/座位預約) 
   */
  checkDotColor() {
    const booking = this.thisDayBookingList.pop();
    if(booking?.bookingType === "room") {
      return "#661983";
    } 
    else if (booking?.bookingType === "site") { 
      return "#FBE0FF";
    }
    return "yellow";
  }


  /* 
   * 上個月。
   */
  backMonth() {
    this.currentMonth = this.currentMonth - 1;
    this.checkMonth();
    this.setCalendarDateInfo();
    this._selectDate = 1;
    this.emitDateInfo();
  }


  /* 
   * 下個月。
   */
  nextMonth() {
    this.currentMonth = this.currentMonth + 1;
    this.checkMonth();
    this.setCalendarDateInfo(); 
    this._selectDate = 1;
    this.emitDateInfo();
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
   * 選擇日期
   */
  selectDate(date: number) {
    if( date > 0 ) {
      this._selectDate = date;
    }
    this.emitDateInfo();
  }

  /*
   * 射出 年月日資訊 
   */
  emitDateInfo() {
    let selectDate = this.currentYear + '-' + this.currentMonth + '-' + "1";
    if(this._selectDate != 0){
      selectDate = this.currentYear + '-' + this.currentMonth + '-' + this._selectDate;
    }
    this.selectDatInfo.emit(selectDate);
  }

}
