import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CloudFunService } from 'src/app/firebase-api/services/cloud-fun.service';

@Injectable({
  providedIn: 'root'
})
export class EcpayService {

  constructor(
    private cloudFunService: CloudFunService,
  ) { }

  openECPayWindow(planType:string, planTimeType:string) {
    //導向綠界付款
    window.open(this.cloudFunService.cloudFunApiList.ECPAY_SELECT_PAY_PAGE + "?planType=" + planType + "&planTimeType=" + planTimeType);
  }

}
