import { Component } from '@angular/core';
import { PlanTypeModel } from '../../models/plan-type.model';
import { PlanTimeTypeModel } from '../../models/plan-time-type.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-paid-plan-list',
  templateUrl: './paid-plan-list.component.html',
  styleUrls: ['./paid-plan-list.component.scss']
})
export class PaidPlanListComponent {

  // 選擇方案 models
  palnTypeModel = new PlanTypeModel();
  // 選擇時段 models
  planTimeTypeModel = new PlanTimeTypeModel();

  iconCheckNo = "/assets/images/icon/icon_check_no.png";
  iconCheckOk = "/assets/images/icon/icon_check_ok.png";
  iconUrl1 = this.iconCheckNo;
  iconUrl2 = this.iconCheckNo;
  iconUrl3 = this.iconCheckNo;
  selectPlanType = "";
  selectPlanTimeType = "";

  constructor(
    private router: Router,
  ) {}

  /* 
   * 勾選 欲 購買方案 
   */
  _selectPlanType(selectType: string) {
    this.initRadioGroup();
    this.selectPlanType = selectType;
    switch(selectType) {
      case this.palnTypeModel.studio:
        this.iconUrl1 = this.iconCheckOk;
        break;
      case this.palnTypeModel.group:
        this.iconUrl2 = this.iconCheckOk;
        break;
      case this.palnTypeModel.enterprise:
        this.iconUrl3 = this.iconCheckOk;
        break;
      default:
        this.selectPlanType = "";
    }
  }

  /* 
   * 勾選 購買方案後，選擇時段
   */
  _selectPlanTimeType(selectPlanType: string, selectPlanTimeType: string) {
    this.selectPlanTimeType = "";
    if(this.selectPlanType === selectPlanType) {
      this.selectPlanTimeType = selectPlanTimeType;
    }
  }

  /* 
   * 初始 radio 按鈕 
   */
  initRadioGroup() {
    this.iconUrl1 = this.iconCheckNo;
    this.iconUrl2 = this.iconCheckNo;
    this.iconUrl3 = this.iconCheckNo;
  }

  /* 
   *  下一步, 送給 伺服器 (google cloud function),由 伺服器 與 綠界金流 取付款介面
   */
  routeToECPayForm() {
    //檢查是否已勾選 購買方案
    if(this.selectPlanType === "") {
      alert("請選擇購買方案");
      return;
    }
    //檢查是否已勾選 購買方案
    if(this.selectPlanTimeType === "") {
      alert("請選擇購買方案時段");
      return;
    }

    //導向綠界付款
    window.open("https://getecpaysdkpage-querqokzna-uc.a.run.app?planType=" + this.selectPlanType + "&planTimeType=" +this.selectPlanTimeType);
    this.router.navigate(["/home"]);
  }

}


