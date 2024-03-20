import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartTimeModel } from 'src/app/review-room/models/chartTimeModel.model';
import { RateModel } from 'src/app/review-room/models/rate.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudFunService {

  cloudFunApiList = {
    // [空間總覽] [借用趨勢] api 
    RVIEW_ROOM_BOOKING_TREND : "https://getrviewroomchartbytimetype-querqokzna-uc.a.run.app",
    // [空間總覽] [剩餘空間] api 
    REVIEW_ROOM_RATE: "https://getbookingratelist-querqokzna-uc.a.run.app",
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
    return this.httpClient.get<ChartTimeModel>(this.cloudFunApiList.RVIEW_ROOM_BOOKING_TREND + "?timeType=" + timeType);
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
  getBookingRate(month: number): Observable<RateModel[]> {
    return this.httpClient.get<RateModel[]>(this.cloudFunApiList.REVIEW_ROOM_RATE + "?month=" + month);
  }

}
