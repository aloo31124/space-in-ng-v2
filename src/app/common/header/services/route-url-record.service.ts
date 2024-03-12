import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RouteUrlRecordService {

  private routeUrlChangeSubject = new Subject<string>();
  routerUrlChangeEmit = this.routeUrlChangeSubject.asObservable();

  routeUrlRecord: string[] = [];
  previousUrl = "";
  currentUrl = "";

  constructor(
    private location: Location,
    private router: Router,
  ) { 
    // 每次初始時, 存取新的 路由路徑
    this.router.events.subscribe((event)=> {
      if (event instanceof NavigationEnd) {   
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        this.routeUrlRecord.push(event.url);
      };
      console.log(this.routeUrlRecord);

    });
  }

  /*
   * 上一個路由路徑
   */
  getPreviousUrl():string {
    return this.routeUrlRecord[this.routeUrlRecord.length -2];
  }

  /*
   * 當前路由路徑
   */
  getCurrentUrl():string {
    return this.routeUrlRecord[this.routeUrlRecord.length -1];
  }

  /*
   * 清除所有路徑 
   */
  cleanUrlRecord():void {
    this.routeUrlRecord = [];
  }

  /*
   * 下一頁 
   */
  nextPage(nextUrl: string, navigationExtras: NavigationExtras) {
    // 將下一個 url 送給 header
    this.routeUrlChangeSubject.next(nextUrl);
    // 檢查當前頁面
    this.checkRouteUrl(this.getCurrentUrl());
    // 導向下一頁
    this.router.navigate([nextUrl], navigationExtras);
  }

  /*
   * 上一頁 
   */
  backPage() {
    const previousUrl = this.getPreviousUrl();
    console.log(this.routeUrlRecord);
    console.log("back : " + previousUrl);
    // 問號參數的攜帶需處理
    if(previousUrl.includes("?")) {
      this.location.back();
    }
    this.routeUrlRecord.pop();
    this.routeUrlRecord.pop();
    this.router.navigate([previousUrl]);
  }

  /*
   * 檢查該路徑是否有可 [上一頁]
   * post, delete "後", 清除該路徑, 不能回到 post, delete頁面, 避免重複動作 
   */
  checkRouteUrl(checkUrl: string) {
    if(!checkUrl) {
      return;
    }
    if(checkUrl.includes("booking-check-form")) {
      this.cleanUrlRecord();
      this.routeUrlRecord.push("/");
      this.routeUrlRecord.push("/home");
    }
  }

}
