import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';



@Component({
  selector: 'app-booking-date-page',
  templateUrl: './booking-date-page.component.html',
  styleUrls: ['./booking-date-page.component.scss']
})
export class BookingDatePageComponent {


  currentDate = new Date();
  currentYear = 0;
  currentMonth = 0;
  currentMonthAllDay = 0;
  currentMonthFirstDay?: Date;
  currentMonthFirstDayWeekly = 0;
  displayAllDayGrid = 0
  _selectDate = 1;
  _bookedDateAll: Date[] = [];
  _bookedDay: number[] = [];
  
  
  constructor(
    private router: Router,
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
    
  }

  /* 
   * 確認該日是否已被 bookin，顯示 紫色小點 dot
   */
  isShowDot(checkDay: number): boolean {
    for(let i=0; i< this._bookedDay.length; i++){
      if(this._bookedDay[i] === checkDay){
        return true;
      }
    }
    return false;
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
      console.log(this.currentMonth);
      this.currentMonth = 1;
      this.currentYear = this.currentYear + 1;   
      return;   
    }
  }


  /* 
   * 選擇日期
   */
  selectDate(date: number) {
    console.log("selectDate: " + date);
    if( date > 0 ) {
      this._selectDate = date;
    }
  }


  /* 
   * 下一步
   */
  nextStep() {

    let selectDate = this.currentYear + '-' + this.currentMonth + '-' + "1";
    if(this._selectDate != 0){
      selectDate = this.currentYear + '-' + this.currentMonth + '-' + this._selectDate;
    }

    alert("選擇日期為: " + selectDate);

    // 建立 NavigationExtras 對象
    const navigationExtras: NavigationExtras = {
      queryParams: {
        selectDate: selectDate
      }
    };
    
    this.router.navigate(["booking-clock"], navigationExtras);
  }


}
