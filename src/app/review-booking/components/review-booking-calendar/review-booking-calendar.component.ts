import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { 
  Firestore,
  collection,
  collectionData,
  addDoc
} from '@angular/fire/firestore';

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
  _bookedDateAll: Date[] = [];
  _bookedDay: number[] = [];
  
  
  constructor(
    private router: Router,
    private firestore: Firestore
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
    const collectionInstance = collection(this.firestore, 'UsersTest');
    collectionData(
        collectionInstance, 
        {idField: 'fireStoreId'}  // fireStoreId
      ).subscribe((data) => {
        console.log(data);
        this._bookedDateAll = [];
        this._bookedDay = [];
        const startDate = new Date(this.currentYear + '-' + this.currentMonth + '-01');
        const endDate = new Date(this.currentYear + '-' + this.currentMonth + '-' + this.currentMonthAllDay);
        for(let i=0 ; i< data.length ; i++){
          const checkDate = new Date(data[i]['selectDate']);
          if(startDate <= checkDate && checkDate <= endDate){
            this._bookedDateAll[i] = new Date(data[i]['selectDate']);
            // 取得 已被 bookin 之日期
            this._bookedDay[i] = this._bookedDateAll[i].getDate();
          }
        }
        console.log(this._bookedDay);        
      });
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

    if(!this._bookedDay.includes(date)) {
      return;
    }

    if(date > 0) {
      this._selectDate = date;
    }

    //取得 firebase id (需要優化)
    // 很爛的寫法 為啥要 重取一次 ="= ， 需要建立 model
    const collectionInstance = collection(this.firestore, 'UsersTest');
    collectionData(
        collectionInstance, 
        {idField: 'fireStoreId'}  // fireStoreId
      ).subscribe((data) => {
        const startDate = new Date(this.currentYear + '-' + this.currentMonth + '-01');
        const endDate = new Date(this.currentYear + '-' + this.currentMonth + '-' + this.currentMonthAllDay);
        for(let i=0 ; i< data.length ; i++){

          const checkDate = new Date(data[i]['selectDate']); 
          if(startDate <= checkDate && checkDate <= endDate && checkDate.getDate() === date){  

            // 建立 NavigationExtras 對象
            const navigationExtras: NavigationExtras = {
              queryParams: {                
                fireStoreId: data[i]['fireStoreId'],
                selectDate: data[i]['selectDate'],
                selectTime: data[i]['selectTime'],
                bookingType: data[i]['bookingType']
              }
            };
            
            this.router.navigate(["review-booking-form"], navigationExtras);
          }
        }
      });
  }

}
