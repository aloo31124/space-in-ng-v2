import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RouteUrlRecordService } from '../../../../auth-route/services/route-url-record.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // header 標題
  headerTitle = "";
  // 是否為主畫面 header底圖
  isMainHeader = true;
  // 上一頁 是否指定其他路徑
  otherBackUrl = "";
  // 是否隱藏上一頁 icon
  isHiddenBacke = false;
  // header填充pedding 高度
  headerPeddingHeigh = '200px';
  // header 當前元素
  @ViewChild('header') headerElementRef!: ElementRef;
  

  constructor(
    private routeUrlRecordService: RouteUrlRecordService<{}>,
  ) {

    this.routeUrlRecordService
      .routerUrlChangeEmit
      .subscribe(nextUrl => {
        // [下一頁] 導向路由時觸發
        this.setHeaderImg(nextUrl);
        this.setHeaderTitle(nextUrl);
      })
  }

  ngOnInit() {
    this.setHeaderImg(this.routeUrlRecordService.getCurrentUrl());
  } 

  /*
   * 設定判斷 該 header 底圖 
   */
  setHeaderImg(checkUrl: string) {
    //[下一頁] 依照當前路徑切換參數
    if(checkUrl === "/home" || checkUrl === "/" || !checkUrl) {
      this.isMainHeader = true;
    } else {
      this.isMainHeader = false;
    }

    //判斷 header 填充物 高度
    if(window.innerWidth > 1100) {
        this.headerPeddingHeigh  = this.isMainHeader? '200px':'100px';
    } 
    else if(500 <= window.innerWidth && window.innerWidth <= 1100) {
      this.headerPeddingHeigh  = this.isMainHeader? '200px':'100px';
    } 
    else {
      this.headerPeddingHeigh  = this.isMainHeader? '160px':'100px';
    }
  }

  /*
   * 藉由 下一頁 路由 url 判斷該 header 標題 
   */
  setHeaderTitle(nextUrl: string) {
    if(!nextUrl) {
      this.headerTitle = "";
    }
    else if(nextUrl.includes("review-booking")) {
      this.headerTitle = "已預約";
    } 
    else if(nextUrl.includes("booking-")) {
      this.headerTitle = "預約空間";
    } 
    else if(nextUrl.includes("review-room")) {
      this.headerTitle = "空間總覽";
    } 
    else if(nextUrl.includes("pay-")) {
      this.headerTitle = "購買方案";
    } 
    else {
      this.headerTitle = "";
    }
  }

  /*
   * 上一頁 
   */
  backPage() {
    this.setHeaderImg(this.routeUrlRecordService.getPreviousUrl());
    this.setHeaderTitle(this.routeUrlRecordService.getPreviousUrl());
    this.routeUrlRecordService.backPage();
  }

}
