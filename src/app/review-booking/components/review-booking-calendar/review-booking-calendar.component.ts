import { Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Booking } from 'src/app/booking/models/booking.model';
import { RouteUrlRecordService } from 'src/app/common/header/services/route-url-record.service';

@Component({
  selector: 'app-review-booking-calendar',
  templateUrl: './review-booking-calendar.component.html',
  styleUrls: ['./review-booking-calendar.component.scss']
})
export class ReviewBookingCalendarComponent {


  // 選擇日期
  selectDateInfo = "";
  // 該日 預約booking 紀錄
  selectDayAllBookingRecordList = new Array<Booking>();

  // dialog 是否隱藏 該日 之 booking 紀錄
  isHiddenDialogBookingRecord = true;
  // dialog 該日 booking 紀錄陣列
  dialogBookingRecordItemList = new Array<string>();
  
  
  constructor(
    private routeUrlRecordService: RouteUrlRecordService,
  ) { }

  ngOnInit(): void {
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
    this.dialogBookingRecordItemList = [];
    this.selectDayAllBookingRecordList = bookingRecordList;
    this.selectDayAllBookingRecordList
      .forEach(booking => {
        this.dialogBookingRecordItemList.push(booking.startTime + "~" + booking.endTime);
      });
    // 顯示 dialog
    if(this.dialogBookingRecordItemList.length > 0) { // 首次忽略
      this.isHiddenDialogBookingRecord = false;
    } 
  }

  /*
   * 選擇該日 booking 紀錄, 並導向取消頁面 
   */
  selectBookingToCancle(bookingTime: string) {
    const bookingTimeList = bookingTime.split("~");

    this.selectDayAllBookingRecordList
      .forEach(booking => {
        // 後續要改成id @_@
        console.log(booking.startTime)
        if(new Date(booking.startDate).getTime() === new Date(this.selectDateInfo).getTime() &&
            booking.startTime === bookingTimeList[0]) {
          // 建立 NavigationExtras 對象
            const navigationExtras: NavigationExtras = {
              queryParams: {                
                fireStoreId: booking.fireStoreId,
                selectDate: booking.startDate,
                selectTime: booking.startTime,
                bookingType: booking.bookingType,
                selectRoom: booking.roomName,
              }
            };
          this.routeUrlRecordService.nextPage("review-booking-form", navigationExtras);
        }
      });
  }


}
