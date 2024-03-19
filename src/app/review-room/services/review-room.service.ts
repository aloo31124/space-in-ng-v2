import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CloudFunService } from 'src/app/firebase-api/services/cloud-fun.service';
import { ChartTimeModel } from '../models/chartTimeModel.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewRoomService {

  constructor(
    private cloudFunService: CloudFunService,
  ) { }

  /*
   * 取得 booking 變化趨勢 
   */
  getChartByTimeType(timeType:string): Observable<ChartTimeModel> {
    return this.cloudFunService.getBookingTrend(timeType);
  }
  
  /*
   * 取得 booking 每日剩餘空間 
   * 資料格式:
    [
      {date:"2024-3-15", rate: 10},
      {date:"2024-3-3", rate: 20},
    ];
   */
  currentMonthRoomRemainingRoomRate =
  [
    {date:"2024-3-15", rate: 10},
    {date:"2024-3-3", rate: 20},
    {date:"2024-3-17", rate: 40},
    {date:"2024-3-7", rate: 90},
    {date:"2024-2-1", rate: 42},
    {date:"2024-2-21", rate: 11},
  ];
  getBookingRate() {
    return this.currentMonthRoomRemainingRoomRate;
  }

}
