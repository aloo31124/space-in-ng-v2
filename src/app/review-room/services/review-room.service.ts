import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartTimeType } from '../models/chartTimeType.model';
import { ChartTimeModel } from '../models/chartTimeModel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewRoomService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getChartByTimeType(timeType:string): Observable<ChartTimeModel> {
    return this.httpClient.get<ChartTimeModel>("https://getrviewroomchartbytimetype-querqokzna-uc.a.run.app?timeType=" + timeType);
  }
 
}
