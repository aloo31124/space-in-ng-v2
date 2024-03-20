import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DialogItemModel } from 'src/app/common/dialog/models/item.model';
import { RateModel } from '../../models/rate.model';
import { ReviewRoomService } from '../../services/review-room.service';
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

  //選擇空間種類 dialog
  dialogRoomType: DialogItemModel[] = [{id:"全部", name: "全部"}, {id:"教室預約", name: "教室預約"}, {id:"座位預約", name:"座位預約"}];
  isDialogHiddenRoomType = true;
  //選擇剩餘空間 dialog
  dialogRemainRoomRate: DialogItemModel[] = [{id:"10%", name:"10%"}, {id:"20%", name:"20%"}, {id:"30%", name:"30%"}, {id:"40%", name:"40%"}, {id:"50%", name:"50%"}];
  isDialogHiddenRemainRommRate = true;

  currentDate = new Date();
  currentYear = 0;
  currentMonth = 0;
  rateList: RateModel[] = [];

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
    private reviewRoomService: ReviewRoomService,
    private firestore: Firestore,
  ) { }

  ngOnInit(): void {
    //取得當前日期
    this.currentDate = new Date(); 

    //取得當前年月
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth() + 1; //月份從0開始算，後續計算需加1
    this.setCalendarDateInfo();
    this.getRateList();
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
   * 判斷後, 顯示剩餘率
   */
  isShowRate(date: number): string {
    if(!this.rateList) {
      return "";
    }

    const rateDate = this.rateList.filter(rate => { return new Date(rate.date).getDate() === date })[0];
    if(!rateDate) {
      return "";
    }
    if(this.showRate < rateDate.rate) {
      return "";
    }

    return rateDate.rate + "%";
  }


  /* 
   * 上個月。
   */
  backMonth() {
    this.currentMonth =this.currentMonth - 1;
    this.checkMonth();
    this.setCalendarDateInfo();
    this._selectDate = 1;
  }


  /* 
   * 下個月。
   */
  nextMonth() {
    this.currentMonth =this.currentMonth + 1;
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

  public selectRate(selectRate: string) {
    this.isHiddenDialog = true;
    switch(selectRate) {
      case "10%" :
        this.showRate = 10;
        break;
      case "20%" :
        this.showRate = 20;
        break;
      case "30%" :
        this.showRate = 30;
        break;
      case "40%" :
        this.showRate = 40;
        break;
      case "50%" :
        this.showRate = 50;
        break;
      default:
        this.showRate = 30;
    }
    
  }

  public selectRoomType(selectRoomType: string) {
    this.isHiddenRoomDialog = true;
    this._selectRoomType = selectRoomType;
  }

  public getRateList() {
    //this.rateList = this.reviewRoomService.getBookingRate();
    this.reviewRoomService
      .getBookingRate(3)
      .subscribe(responseData => {
        console.log(responseData);
        this.rateList.push(responseData);
      });
    console.log(this.rateList);
  }

}
