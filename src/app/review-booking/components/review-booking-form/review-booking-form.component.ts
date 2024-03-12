import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewBookingService } from '../../services/review-booking.service';
import { RouteUrlRecordService } from 'src/app/common/header/services/route-url-record.service';

@Component({
  selector: 'app-review-booking-form',
  templateUrl: './review-booking-form.component.html',
  styleUrls: ['./review-booking-form.component.scss']
})
export class ReviewBookingFormComponent {

  fireStoreId = "";
  selectDate = "";
  selectTime = "";
  selectDay = "";
  bookingType = "";

  constructor(
    private routeUrlRecordService: RouteUrlRecordService,
    private activatedRoute: ActivatedRoute,
    private reviewBookingService: ReviewBookingService
  ) {
  }

  ngOnInit(): void {
    // 提取日期参数
    this.activatedRoute.queryParams.subscribe(params => {
      this.fireStoreId = params['fireStoreId'];
      this.selectDate = params['selectDate'];
      this.selectTime = params['selectTime'];
      this.bookingType = params['bookingType'];

      

      const dayOfWeek = (new Date(this.selectDate)).getDay();
      //判斷星期
      switch(dayOfWeek) {        
        case 0:
          // 星期日
          this.selectDay = "(日)";
          break;
        case 1:
          // 星期一
          this.selectDay = "(一)";
          break;
        case 2:
          // 星期二
          this.selectDay = "(二)";
          break;
        case 3:
          // 星期三
          this.selectDay = "(三)";
          break;
        case 4:
          // 星期四
          this.selectDay = "(四)";
          break;
        case 5:
          // 星期五
          this.selectDay = "(五)";
          break;
        case 6:
          // 星期六
          this.selectDay = "(六)";
          break;
      }
    });
  }

  deleteBooking() {
    alert("取消借用");
    console.log(this.fireStoreId);
    this.reviewBookingService.deleteBookingById(this.fireStoreId);
    this.routeUrlRecordService.nextPage("review-booking-calendar", {});
  }

}
