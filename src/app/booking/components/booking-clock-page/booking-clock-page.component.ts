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

    const selectTime = this.getHourString() + ":" + this.getMinString();

    alert(selectTime);
    
    const navigationExtras: NavigationExtras = {
      queryParams: {
        selectDate: this.selectDate,
        startTime: this.startTime,
        endTime: this.endTime,
      }
    };
    
    this.routeUrlRecordService.nextPage("booking-select-type", navigationExtras);
  }
  
}
