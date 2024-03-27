import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartTimeModel } from 'src/app/review-room/models/chartTimeModel.model';
import { RateModel } from 'src/app/review-room/models/rate.model';
import { Observable } from 'rxjs';
import { TodayRemanent } from 'src/app/review-room/models/today-remanent.model';

@Injectable({
  providedIn: 'root'
})
export class CloudFunService {

  cloudFunApiList = {
    // [空間總覽] [借用趨勢] api 
    REVIEW_ROOM_BOOKING_TREND : "https://getrviewroomchartbytimetype-querqokzna-uc.a.run.app",
    // [空間總覽] 每個月份 [剩餘空間] api 
    REVIEW_ROOM_RATE: "https://getbookingratelist-querqokzna-uc.a.run.app",
    // [空間總覽] 今日 [剩餘空間] api 
    REVIEW_ROOM_TODAY: "https://gettodayremanent-querqokzna-uc.a.run.app/",
    // [購買方案] [綠界付款] 第三方 選擇付款方式 新視窗畫面
    ECPAY_SELECT_PAY_PAGE : "https://getecpayselectplanpage-querqokzna-uc.a.run.app",
    // [購買方案] [綠界付款] 處理 form 資訊後, 回傳結果
    ECPAY_SELECT_PAY_RESULT : "https://getecpayresult-querqokzna-uc.a.run.app",
  }

  constructor(
    private httpClient: HttpClient,
  ) { }

  /*
   * 取得 [空間總覽] [借用資訊] api 
   */
  getBookingTrend(timeType:string): Observable<ChartTimeModel> {
    return this.httpClient.get<ChartTimeModel>(this.cloudFunApiList.REVIEW_ROOM_BOOKING_TREND + "?timeType=" + timeType);
  }

  /*
   * 取得 booking 每日剩餘空間 
   * 資料格式:
   * 
    [
      {date:"2024-3-15", rate: 10},
      {date:"2024-3-3", rate: 20},
    ];
   */
  getBookingRate(date: string, roomType: string): Observable<RateModel[]> {
    return this.httpClient.get<RateModel[]>(this.cloudFunApiList.REVIEW_ROOM_RATE + "?date=" + date + "&roomType=" + roomType);
  }

  /*
   * 取得今日 剩餘空間 之 資訊
   {"remanent":3,"totalRoom":3} 
   */
  getTodayRate() {
    return this.httpClient.get<TodayRemanent>(this.cloudFunApiList.REVIEW_ROOM_TODAY);
  }

}
