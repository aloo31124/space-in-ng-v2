import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-clock-page',
  templateUrl: './booking-clock-page.component.html',
  styleUrls: ['./booking-clock-page.component.scss']
})
export class BookingClockPageComponent {

  _selectHour = 9;
  isSelectHour = true;
  _selectMin = 0;
  isSelectMin = false;
  isAm = true;
  isPm = false;


  //選擇開始時段
  isSelectStartTimeInput = true;


  constructor(
    private routeUrlRecordService: RouteUrlRecordService<{}>,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
  ) {}

  
  toggleInput() {
    this.isSelectStartTimeInput = !this.isSelectStartTimeInput;
  }

  getHourString(): string {
    const selectHour = this._selectHour + ( this.isPm? 12 : 0 );
    return selectHour.toString().length === 2? selectHour.toString(): "0" + selectHour.toString();
  }

  getMinString(): string {
    return this._selectMin.toString().length === 2? this._selectMin.toString(): "0" + this._selectMin.toString();
  }

  selectHour() {
    this.isSelectHour = true;
    this.isSelectMin = false;    
    this.setSelectTime();
  }

  selectMin() {
    this.isSelectHour = false;
    this.isSelectMin = true; 
    this.setSelectTime();
  }

  selectAm() {
    this.isAm = true;
    this.isPm = false;
    this.setSelectTime();
  }

  selectPm() {
    this.isAm = false;
    this.isPm = true;
    this.setSelectTime();
  }
    

  ngOnInit(): void {}

  /*
   * 從 service 中取得 上一步選擇日 之前 booking 紀錄 
   */
  getThisDayAllBookingRecord() {
    return this.bookingService.getThisDayAllBookingRecord();
  }

  
  selectTime(selectTime: number) {
    if( this.isSelectHour ) {
      this._selectHour = selectTime;
    }

    if( this.isSelectMin ) {
      this._selectMin = selectTime;
    }

    this.setSelectTime();
  }

  /*
   * 從 service 取得 開始時間 
   */
  getStartTime() {
    return this.bookingService.getStartTime();
  }

  /*
   * 從 service 取得 結束時間 
   */
  getEndTime() {
    return this.bookingService.getEndTime();
  }

  /*
   * 設定 開始 或 結束 時間 
   */
  setSelectTime() {
    const selectTime = this.getHourString() + ":" + this.getMinString();
    if(this.isSelectStartTimeInput) {
      this.bookingService.setStartTime(selectTime);
    } 
    else {
      this.bookingService.setEndTime(selectTime);
    } 
  }

  getRotationAngle(hour: number): number {
    return (hour - 1) * 30; 
  }

  /*
   * 按下下一步 icon , 檢查時段, 並路由導向 
   */
  nextStep() {

    if(!this.checkValidTime()) {
      return;
    }

    alert("選擇時段: " + this.getStartTime() + "~" + this.getEndTime());

    this.routeUrlRecordService.nextPage("booking-select-type", {});
  }
  
  /*
   * 確認選擇時端卡控是否正確:
   *  1. 開始時間 需小於 結束時間
   *  2. 選擇之時段 不可 包含 已預約之時段 => 時端不可重疊
   */
  checkValidTime() {
    const selectStarTime = new Date(this.bookingService.getSelectDate() + " " + this.getStartTime());
    const selectEndTime = new Date(this.bookingService.getSelectDate() + " " + this.getEndTime());

    if(selectStarTime >= selectEndTime) {
      alert("開始時間必須早於結束時間, 請重新選擇時段。");
      return false;
    }

    if(this.getThisDayAllBookingRecord().length === 0){
      // 無重複時段需比對
      return true;
    }

    // 檢查段是否重複
    let isTimeReatList = false
    // 重複時段文字
    let reatTimeWording = "";
    this.getThisDayAllBookingRecord().filter(bookingRecord => {
      const startTime = new Date(this.bookingService.getSelectDate() + " " + bookingRecord.startTime);
      const endTime = new Date(this.bookingService.getSelectDate() + " " + bookingRecord.endTime);
      console.log(startTime);
      console.log(endTime);
      //時段重疊
      if (startTime < selectEndTime  && endTime > selectStarTime) {
        isTimeReatList = true;
        reatTimeWording = bookingRecord.startTime + "~" + bookingRecord.endTime;
      }
    });

    if(isTimeReatList) {
      alert("選擇段:" + this.getStartTime() + "~" + this.getEndTime() + "與" + reatTimeWording + "重疊, 請重新選擇時段。");
      return false;
    }
    
    return true;
  }

  
}
