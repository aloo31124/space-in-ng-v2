import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewRoomService {

    // 本周 資料
    private chartWeekTitle = ['五', '六', '日', '一', '二', '三'];
    private chartWeekSite = [10, 20, 15, 50, 25, 10];
    private chartWeekRoom = [ 5, 15, 25, 10, 40, 60]; 
    // 本月 資料
    private chartMonthTitle = ['1周', '2周', '3周', '4周', '1周', '2周'];
    private chartMonthSite = [10, 20, 15, 50, 25, 10];
    private chartMonthRoom = [ 5, 15, 25, 10, 40, 60];
    // 本季 資料
    private chartSeaSonTitle = [ '9月', '10月', '11月'];
    private chartSeaSonSite = [ 50, 25, 10];
    private chartSeaSonRoom = [ 10, 40, 60];
    // 半年 資料
    private chartHalfYearTitle = ['6月', '7月', '8月', '9月', '10月', '11月'];
    private chartHalfYearSite = [10, 20, 15, 50, 25, 10];
    private chartHalfYearRoom = [ 5, 15, 25, 10, 40, 60];
    // 本年 資料
    private chartYearTitle = ['12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月'];
    private chartYearSite = [5, 15, 25, 10, 40, 25, 10, 20, 15, 50, 25, 10];
    private chartYearRoom = [ 10, 20, 15, 20, 25, 10, 5, 15, 25, 10, 40, 60];

  constructor() { }


  // ============ 本周 資料 ============
  getWeekTitle() {
    return this.chartWeekTitle;
  }
  getWeekSiteData() {
    return this.chartWeekSite;
  }
  getWeekRoomData() {
    return this.chartWeekRoom;
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

  // ============ 本季 資料 ============
  getSeasonTitle() {
    return this.chartSeaSonTitle;
  }
  getSeasonSiteData() {
    return this.chartSeaSonSite;
  }
  getSeasonRoomData() {
    return this.chartSeaSonRoom;
  }  

  // ============ 半年 資料 ============
  getHalfYearTitle() {
    return this.chartHalfYearTitle;
  }
  getHalfYearSiteData() {
    return this.chartHalfYearSite;
  }
  getHalfYearRoomData() {
    return this.chartHalfYearRoom;
  }  

  // ============ 本周 資料 ============
  getYearTitle() {
    return this.chartYearTitle;
  }
  getYearSiteData() {
    return this.chartYearSite;
  }
  getYearRoomData() {
    return this.chartYearRoom;
  }

 
}
