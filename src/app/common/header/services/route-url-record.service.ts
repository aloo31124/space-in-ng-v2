import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteUrlRecordService {
  /*  上一頁 路由 url 紀錄  */

  routeUrlRecord: string[] = [];
  previousUrl = "";
  currentUrl = "";

  constructor(
    private router: Router,
  ) { 
    this.router.events.subscribe((event)=> {
      if (event instanceof NavigationEnd) {   
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        this.routeUrlRecord.push(event.url);
      };
    });
  }

  getPreviousUrl():string {
    return this.previousUrl;
  }

  getCurrentUrl():string {
    return this.currentUrl;
  }

  cleanUrlRecord():void {
    this.routeUrlRecord = [];
  }

}
