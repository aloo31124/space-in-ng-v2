import { Component } from '@angular/core';
import { Booking } from 'src/app/booking/models/booking.model';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { DialogItemModel } from 'src/app/common/dialog/models/item.model';
import { BookingService } from 'src/app/booking/services/booking.service';

@Component({
  selector: 'app-review-booking-calendar',
  templateUrl: './review-booking-calendar.component.html',
  styleUrls: ['./review-booking-calendar.component.scss']
})
export class ReviewBookingCalendarComponent {


  // 選擇日期
  selectDateInfo = "";
  // dialog 是否隱藏 該日 之 booking 紀錄
  isHiddenDialogBookingRecord = true;
  // dialog 該日 booking 紀錄陣列
  dialogBookingRecordItemList = new Array<DialogItemModel>();
  // 所有 booking 紀錄
  bookingList = new Array<Booking>();
  // 畫面 loading 中
  isLoading = true;
  
  
  constructor(
    private routeUrlRecordService: RouteUrlRecordService<Booking>,
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
   * 更新日期元件 之 日期資訊 
   */
  updateSelectDay(selectDay: string) {
    this.dialogBookingRecordItemList = [];
    this.selectDateInfo = selectDay;
    this.bookingList
      .forEach(booking => {
        // 篩選該日期 之前所有 booking 紀錄
        if(new Date(this.selectDateInfo).getTime() === new Date(booking.startDate).getTime()) {
          this.dialogBookingRecordItemList.push({
            id: booking.fireStoreId,
            name: booking.startTime + "~" + booking.endTime
          });
        }
      })
    
    if(this.dialogBookingRecordItemList.length > 0){
      this.isHiddenDialogBookingRecord = false;
    }
  }

  /*
   * 選擇該日 booking 紀錄, 並導向取消頁面 
   */
  selectBookingToCancle(bookingId: string) {

    this.bookingList
      .forEach(booking => {
        if(booking.fireStoreId === bookingId) {
          this.routeUrlRecordService.nextPage("review-booking-form", booking);
        }
      });
  }


}
