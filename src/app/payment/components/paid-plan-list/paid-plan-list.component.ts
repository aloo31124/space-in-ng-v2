import { Component } from '@angular/core';

//https://payment-stage.ecpay.com.tw/
@Component({
  selector: 'app-paid-plan-list',
  templateUrl: './paid-plan-list.component.html',
  styleUrls: ['./paid-plan-list.component.scss']
})
export class PaidPlanListComponent {

  routeToECPayForm() {
    window.open("https://getecpaysdkpage-querqokzna-uc.a.run.app");
  }

}


