import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CloudFunService } from 'src/app/firebase-api/services/cloud-fun.service';
import { ChartTimeModel } from '../models/chartTimeModel.model';
import { RateModel } from '../models/rate.model';
import { TodayRemanent } from '../models/today-remanent.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewRoomService {

  // 取得 今日 剩餘資訊
  private todayRemanent: TodayRemanent = {remanent: 0, totalRoom:10};

  constructor(
    private cloudFunService: CloudFunService,
  ) {
    this.cloudFunService
      .getTodayRate()
      .subscribe(todayRemanent => {
        this.todayRemanent = todayRemanent;
        console.log(this.todayRemanent);
      })
  }

  /*
   * 取得 今日剩餘比率資訊
     剩餘 / 空間總數 
   */
  getTodayRemanent() {
    return this.todayRemanent;
  }

  /*
   * 取得 booking 變化趨勢 
   */
  getChartByTimeType(timeType:string): Observable<ChartTimeModel> {
    return this.cloudFunService.getBookingTrend(timeType);
  }
  
  /*
   * 取得 booking 每日剩餘空間 
   */
  getBookingRate(date: string, roomType: string): Observable<RateModel[]> {
    return this.cloudFunService.getBookingRate(date, roomType);
  }

}
