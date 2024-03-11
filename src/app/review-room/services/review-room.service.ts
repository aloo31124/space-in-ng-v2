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

  getChartByTimeType(timeType:string): Observable<ChartTimeModel> {
    return this.cloudFunService.getBookingTrend(timeType);
  }
 
}
