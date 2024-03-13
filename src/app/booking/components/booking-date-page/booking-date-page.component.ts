import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RouteUrlRecordService } from 'src/app/common/header/services/route-url-record.service';
import { Booking } from '../../models/booking.model';


@Component({
  selector: 'app-booking-date-page',
  templateUrl: './booking-date-page.component.html',
  styleUrls: ['./booking-date-page.component.scss']
})
export class BookingDatePageComponent {

  currentYear = 0;
  currentMonth = 0;
  selectDateInfo = "";
  // 該日 預約booking 紀錄
  selectDayAllBookingRecord = 0;
  // 該日期 預約booking 上限
  bookingDaylimit = 3;
  
  
  constructor(
    private router: Router,
    private routeUrlRecordService: RouteUrlRecordService,
  ) { }

  ngOnInit(): void { }

  /* 
   * 下一步
   */
  nextStep() {
    //檢查該日期是否超過上限
    if(this.selectDayAllBookingRecord >= this.bookingDaylimit) {
      alert("每日預約上限最多 " + this.bookingDaylimit + "次");
      return;
    }

    alert("確定下一步？選擇日期為: " + this.selectDateInfo);
    // 建立 NavigationExtras 對象
    const navigationExtras: NavigationExtras = {
      queryParams: {
        selectDate: this.selectDateInfo
      }
    };
    
    this.routeUrlRecordService.nextPage("booking-clock", navigationExtras);
  }

  /*
   * 更新日期元件 之 日期資訊 
   */
  updateSelectDay(selectDay: string) {
    this.selectDateInfo = selectDay;
  }

  /*
   * 更新 該選擇日期 之 預約 booking 紀錄 
   */
  updateBookingRecord(bookingRecordList: Booking[]) {
    this.selectDayAllBookingRecord = bookingRecordList.length;
  }


}
