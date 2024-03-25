import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Booking } from 'src/app/booking/models/booking.model';
import { RateModel } from 'src/app/review-room/models/rate.model';

@Component({
  selector: 'app-calendar-picker',
  templateUrl: './calendar-picker.component.html',
  styleUrls: ['./calendar-picker.component.scss']
})
export class CalendarPickerComponent {


  // 該日期元件選擇年月日
  @Output() selectDatInfo = new EventEmitter<string>();

  // 所有 Booking 紀錄
  @Input() bookingList = new Array<Booking>();

  // 該空間 其 剩餘率 紀錄
  @Input() rateList: RateModel[] = [];
  
  // 輸入 當前選擇日期
  @Input() _selectDate = 0;

  // 剩餘比率
  @Input() showRate = 60;

  currentDate = new Date();
  currentYear = 0;
  currentMonth = 0;
  currentMonthAllDay = 0;
  currentMonthFirstDay?: Date;
  currentMonthFirstDayWeekly = 0;
  displayAllDayGrid = 0

  
  //該天 booking 幾次
  thisDayBookingList = new Array<Booking>();
  
  
  constructor() { }

  ngOnInit(): void {
    //取得當前日期
    this.currentDate = new Date();
    if(this._selectDate === 0){
      this._selectDate = this.currentDate.getDate();
    }

    //取得當前年月
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth() + 1; //月份從0開始算，後續計算需加1
    this.setCalendarDateInfo();
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
  }


  /* 
   * 下個月。
   */
  nextMonth() {
    this.currentMonth = this.currentMonth + 1;
    this.checkMonth();
    this.setCalendarDateInfo(); 
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
   * 與 當天 所有 booking 紀錄, 方便卡控
   */
  emitDateInfo() {
    let selectDate = this.currentYear + '-' + this.currentMonth + '-' + "1";
    if(this._selectDate != 0){
      selectDate = this.currentYear + '-' + this.currentMonth + '-' + this._selectDate;
    }
    this.selectDatInfo.emit(selectDate);

    const selectDayAllBookingRecord = this.bookingList
      .filter(booking => {
        return (new Date(booking.startDate).getTime() === new Date(selectDate).getTime());
      });
  }


  /* 
   * 行事曆日期逐個判斷, 顯示剩餘率 %
   */
  isShowRate(date: number): string {
    if(!this.rateList) {
      return "";
    }
    console.log(this.rateList)
    const rateDate = this.rateList.filter(rate => { return new Date(rate.date).getDate() === date })[0];
    if(!rateDate) {
      return "";
    }
    if(this.showRate < rateDate.rate) {
      return "";
    }
    return rateDate.rate + "%";
  }

}
