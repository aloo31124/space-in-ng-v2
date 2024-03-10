import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartTimeType } from '../models/chartTimeType.model';
import { ChartTimeModel } from '../models/chartTimeModel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewRoomService {

  private chartTimeType = new ChartTimeType();

    // 本月 測試資料
    private chartMonthTitle = ['1周', '2周', '3周', '4周', '1周', '2周'];
    private chartMonthSite = [10, 20, 15, 50, 25, 10];
    private chartMonthRoom = [ 5, 15, 25, 10, 40, 60];

  constructor(
    private httpClient: HttpClient,
  ) { }


  getChartByTimeType(timeType:string): Observable<ChartTimeModel> {
    return this.httpClient.get<ChartTimeModel>("https://getrviewroomchartbytimetype-querqokzna-uc.a.run.app?timeType=" + timeType);
  }


  // ============ 本月 資料 ============
  getMonthTitle() {
    return this.chartMonthTitle;
  }
  getMonthSiteData() {
    return this.chartMonthSite;
  }
  getMonthRoomData() {
    return this.chartMonthRoom;
  }  
 
}
