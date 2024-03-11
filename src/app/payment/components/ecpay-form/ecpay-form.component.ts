import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EcpayService } from '../../services/ecpay.service';

@Component({
  selector: 'app-ecpay-form',
  templateUrl: './ecpay-form.component.html',
  styleUrls: ['./ecpay-form.component.scss']
})
export class EcpayFormComponent implements OnInit {
  @ViewChild('paymentPage') paymentPageEl!: ElementRef;

  constructor(
    private router: Router,
    private ecpayService: EcpayService,
    private http: HttpClient,
  ) {}

  async ngOnInit() {
    // 取得 HTML 內容
    const paymentPageHtml = await this.fetchPaymentPageHtml();

    // 將 HTML 內容設定給 paymentPageEl
    this.paymentPageEl.nativeElement.innerHTML = paymentPageHtml;
    console.log(document.getElementById('_form_aiochk'));
  }

  /*
   * 請求 fierbase cloud function 後, 由其回傳 綠界 付款 html 頁面 
   */
  private async fetchPaymentPageHtml(): Promise<string> {
    // 發送 HTTP 請求到綠界 API
    const apiUrl = 'https://getecpayresult-querqokzna-uc.a.run.app';
    this.http
      .get(apiUrl)
      .subscribe(
        x => {
          console.log("success!");
          console.log(x);
          return x;
        },
        error => {
          console.log(" error 2 ! : " + error.error.text);
          this.paymentPageEl.nativeElement.innerHTML = error.error.text;
          
          return error.error.text;          
        }
      );
      return "畫面載入中,請稍等。";
  }


  /*
   * 測試用 :)  
   */
  openWindow() {
    //導向綠界付款
    this.ecpayService.openECPayWindow("studio", "month");
    this.router.navigate(["/home"]);
  }

}
