import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-booking-clock-page',
  templateUrl: './booking-clock-page.component.html',
  styleUrls: ['./booking-clock-page.component.scss']
})
export class BookingClockPageComponent {

  selectDate = "";

  _selectHour = 12;
  isSelectHour = true;
  _selectMin = 0;
  isSelectMin = false;
  isAm = true;
  isPm = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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
  }

  selectMin() {
    this.isSelectHour = false;
    this.isSelectMin = true;     
  }

  selectAm() {
    this.isAm = true;
    this.isPm = false;
  }

  selectPm() {
    this.isAm = false;
    this.isPm = true;
  }
    

  ngOnInit(): void {
    // 提取日期参数
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectDate = params['selectDate'];
    });
  }

  
  selectTime(selectTime: number) {
    console.log("selectTime : " + selectTime);
    if( this.isSelectHour ) {
      this._selectHour = selectTime;
    }

    if( this.isSelectMin ) {
      this._selectMin = selectTime;
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
        selectTime: selectTime
      }
    };
    
    this.router.navigate(["booking-select-type"], navigationExtras);
  }
  
}
