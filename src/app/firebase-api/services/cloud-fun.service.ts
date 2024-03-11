import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartTimeModel } from 'src/app/review-room/models/chartTimeModel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudFunService {

  cloudFunApiList = {
    // [空間總覽] [借用資訊] api 
    RVIEW_ROOM_BOOKING_TREND : "https://getrviewroomchartbytimetype-querqokzna-uc.a.run.app",
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

}
