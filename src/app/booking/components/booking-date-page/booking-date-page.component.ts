import { Component } from '@angular/core';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';


@Component({
  selector: 'app-booking-date-page',
  templateUrl: './booking-date-page.component.html',
  styleUrls: ['./booking-date-page.component.scss']
})
export class BookingDatePageComponent {
  

  // 該日期 預約booking 上限
  bookingDaylimit = 3;
  // 所有 booking 紀錄
  bookingList = new Array<Booking>();
  // 畫面loading
  isLoading = true;

  
  constructor(
    private routeUrlRecordService: RouteUrlRecordService<{}>,
    private bookingService: BookingService,
    private googleAuthService: GoogleAuthService,
  ) { }

  ngOnInit(): void { 
    this.getAllBookingRecord();
    this.getSelectDate();
  }

  /*
   * 從 bookingService 取得之前已選擇日期 
   */
  getSelectDate() {
    if(this.bookingService.getSelectDate().length !== 0) {
      return new Date(this.bookingService.getSelectDate()).getDate();
    }
    return 0;
  }


  /* 
   * 從 FireStore 取得所有 booking 日期。
   */
  getAllBookingRecord() {
    this.bookingService
      .getBookingByMail(this.googleAuthService.getCurrentUser().email)
      .then(doc => {
        console.log(doc)
        console.log(doc.docs)
        doc.docs.forEach((data: any) => {
          const booking = data._document.data.value.mapValue.fields;
          console.log(booking);
          this.bookingList.push({...booking});
        });
        console.log(this.bookingList);
        console.log(this.bookingList[0].startDate);
      })
      .finally(() => {
        this.isLoading = false;
      })
  }

  /* 
   * 下一步
   */
  nextStep() {
    
    // 取得該選擇日期 有幾筆 預約記錄
    const selectDayAllBookingRecordList = this.bookingList.filter(booking => {
      return new Date(booking.startDate).getTime() === new Date(this.bookingService.getSelectDate()).getTime(); 
    });

    // 檢查該日期是否超過上限
    if(selectDayAllBookingRecordList.length >= this.bookingDaylimit) {
      alert("每日預約上限最多 " + this.bookingDaylimit + "次");
      return;
    }

    // 存入該選擇日期紀錄
    this.bookingService.setThisDayAllBookingRecord(selectDayAllBookingRecordList);

    alert("確定下一步？選擇日期為: " + this.bookingService.getSelectDate());
    this.routeUrlRecordService.nextPage("booking-clock", {});
  }


  /*
   * 更新日期元件 之 日期資訊 
   * 接收 行事曆 component 的 emit
   */
  getEmitterSelectDay(selectDay: string) {
    this.bookingService.setSelectDate(selectDay);
  }

}
