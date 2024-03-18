import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { RouteUrlRecordService } from 'src/app/common/header/services/route-url-record.service';

@Component({
  selector: 'app-booking-clock-page',
  templateUrl: './booking-clock-page.component.html',
  styleUrls: ['./booking-clock-page.component.scss']
})
export class BookingClockPageComponent {

  _selectHour = 12;
  isSelectHour = true;
  _selectMin = 0;
  isSelectMin = false;
  isAm = true;
  isPm = false;

  selectDate = "";
  selectStartTime = "12:00";
  selectEndTime = "12:00";
  selectDayAllBookingRecord = new Array<string>();

  //選擇開始時段
  isSelectStartTimeInput = true;
  //選擇結束時段
  //isEndTimeInput = false;
  //開始時間
  startTime = "";
  //結束時間
  endTime = "";


  constructor(
    private routeUrlRecordService: RouteUrlRecordService,
    private activatedRoute: ActivatedRoute
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
    

  ngOnInit(): void {
    // 提取日期参数
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.selectDate = params['selectDate'];
        this.selectDayAllBookingRecord = params['selectDayAllBookingRecord'];
      });
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
   * 設定 開始 或 結束 時間 
   */
  setSelectTime() {
    if(this.isSelectStartTimeInput) {
      this.startTime = this.getHourString() + ":" + this.getMinString();
    } 
    else {
      this.endTime = this.getHourString() + ":" + this.getMinString();
    } 

  }

  getRotationAngle(hour: number): number {
    return (hour - 1) * 30; 
  }

  nextStep() {

    if(!this.checkValidTime()) {
      return;
    }

    const selectTime = this.getHourString() + ":" + this.getMinString();
    alert("選擇時段: " + selectTime);
    
    const navigationExtras: NavigationExtras = {
      queryParams: {
        selectDate: this.selectDate,
        startTime: this.startTime,
        endTime: this.endTime,
      }
    };
    
    this.routeUrlRecordService.nextPage("booking-select-type", navigationExtras);
  }
  
  /*
   * 確認選擇時端卡控是否正確:
   *  1. 開始時間 小於 結束時間
   *  2. 選擇之時段 不可 包含 已預約之時段 => 時端不可重疊
   */
  checkValidTime() {
    const selectStarTime = new Date(this.selectDate + " " + this.startTime);
    const selectEndTime = new Date(this.selectDate + " " + this.endTime);

    if(selectStarTime >= selectEndTime) {
      alert("開始時間必須早於結束時間, 請重新選擇時段。");
      return false;
    }

    // 檢查段是否重複
    let isTimeReatList = false
    this.selectDayAllBookingRecord.filter(bookingTime => {
      const timeArray = bookingTime.split("~");
      const startTime = new Date(this.selectDate + " " + timeArray[0]);
      const endTime = new Date(this.selectDate + " " + timeArray[1]);
      //時段重疊
      if (startTime < selectEndTime  && endTime > selectStarTime ) {
        isTimeReatList = true;
      }
    });

    if(isTimeReatList) {
      alert("選擇段:" + this.startTime + "~" + this.endTime + "與" + this.selectDayAllBookingRecord[0] + "重疊, 請重新選擇時段。");
      return false;
    }
    
    return true;
  }

  
}
