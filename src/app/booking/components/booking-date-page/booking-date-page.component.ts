import { Component } from '@angular/core';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';


@Component({
  selector: 'app-booking-date-page',
  templateUrl: './booking-date-page.component.html',
  styleUrls: ['./booking-date-page.component.scss']
})
export class BookingDatePageComponent {
  
  // 選擇日期
  selectDateInfo = "";
  // 該日期 預約booking 上限
  bookingDaylimit = 3;
  // 所有 booking 紀錄
  bookingList = new Array<Booking>();
  // 畫面loading
  isLoading = true;

  
  constructor(
    private routeUrlRecordService: RouteUrlRecordService<{selectDate: string, selectDayAllBookingRecord: string[]}>,
    private bookingService: BookingService,
  ) { }

  ngOnInit(): void { 
    this.getAllBookingRecord();
  }


  /* 
   * 從 FireStore 取得所有 booking 日期。
   */
  getAllBookingRecord() {
    this.bookingService
      .getAll()
      .subscribe(bookingList => {
        bookingList
          .forEach(booking => {
            this.bookingList.push(new Booking(
              booking["fireStoreId"],
              booking["userId"],
              booking["mail"],
              booking["startDate"],
              booking["endDatae"],
              booking["startTime"],
              booking["endTime"],
              booking["bookingType"],
              booking["roomId"],
              booking["roomName"],
              booking["siteId"],
              booking["siteName"],
            ));
          });
        this.isLoading = false;
      });
  }

  /* 
   * 下一步
   */
  nextStep() {
    
    // 取得該選擇日期 有幾筆 預約記錄
    const selectDayAllBookingRecordList = this.bookingList.filter(booking => {
      return new Date(booking.startDate).getTime() === new Date(this.selectDateInfo).getTime(); 
    });

    console.log(selectDayAllBookingRecordList)

    // 檢查該日期是否超過上限
    if(selectDayAllBookingRecordList.length >= this.bookingDaylimit) {
      alert("每日預約上限最多 " + this.bookingDaylimit + "次");
      return;
    }

    alert("確定下一步？選擇日期為: " + this.selectDateInfo);
    const bookingRecordList = selectDayAllBookingRecordList
      .map(booking => {
        return booking.startTime + "~" + booking.endTime;
      });

    const queryParams =  {
      selectDate: this.selectDateInfo,
      selectDayAllBookingRecord: bookingRecordList
    }
    this.routeUrlRecordService.nextPage("booking-clock", queryParams);
  }


  /*
   * 更新日期元件 之 日期資訊 
   * 接收 行事曆 component 的 emit
   */
  getEmitterSelectDay(selectDay: string) {
    this.selectDateInfo = selectDay;
  }

}
