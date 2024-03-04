import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { 
  Firestore,
  collection,
  collectionData,
  addDoc
} from '@angular/fire/firestore';

@Component({
  selector: 'app-review-room-detail',
  templateUrl: './review-room-detail.component.html',
  styleUrls: ['./review-room-detail.component.scss']
})
export class ReviewRoomDetailComponent {

  currentDate = new Date();
  currentYear = 0;
  currentMonth = 0;
  currentMonthRoomRemainingRoomRate =
    [
      10, 20, 5, 100, 60, 40, 30, 20, 10, 54,
      23, 0,  11, 12, 67, 22, 11, 4,  11, 40,
      10, 20, 5, 100, 60, 100, 60, 40, 30, 1,
    ];
  showRate = 30;
  currentMonthAllDay = 0;
  currentMonthFirstDay?: Date;
  currentMonthFirstDayWeekly = 0;
  displayAllDayGrid = 0
  _selectDate = 1;
  _bookedDateAll: Date[] = [];
  _bookedDay: number[] = [];
  
  isHiddenDialog = true;
  isHiddenRoomDialog = true;
  roomType = { all: "全部", roomBooking: "教室預約", siteBooking: "座位預約" };
  _selectRoomType = this.roomType.all;
  
  
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
    collectionData(collectionInstance)
      .subscribe((data) => {
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
   * 是否顯示剩餘率
   */
  isShowRate(rate: number): boolean {
    return ( this.showRate > rate );
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

    alert(selectDate);

    // 建立 NavigationExtras 對象
    const navigationExtras: NavigationExtras = {
      queryParams: {
        selectDate: selectDate
      }
    };
    
    this.router.navigate(["booking/clock"], navigationExtras);
  }


  /////////////////////////////////////////////////////////////////////////////////////
  
  public showDialog() {
    this.isHiddenDialog = false;
  }

  public hiddenDialog() {
    this.isHiddenDialog = true;
  }

  public selectRate(selectRate: number) {
    this.hiddenDialog();
    this.showRate = selectRate;
  }

  /////////////////////////////////////////////////////////////////////////////////////
  
  public showRoomDialog() {
    this.isHiddenRoomDialog = false;
  }

  public hiddenRoomDialog() {
    this.isHiddenRoomDialog = true;
  }

  public selectRoomType(selectRoomType: string) {
    this.hiddenRoomDialog();
    this._selectRoomType = selectRoomType;
  }

}
