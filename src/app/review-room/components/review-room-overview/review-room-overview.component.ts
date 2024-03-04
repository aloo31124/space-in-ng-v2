import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-room-overview',
  templateUrl: './review-room-overview.component.html',
  styleUrls: ['./review-room-overview.component.scss']
})
export class ReviewRoomOverviewComponent {
  public lineChart: any;
  public isHiddenDialog = true;

  // 時區模組
  public chartTimeModel = { week : "week", month: "month", season: "season", halfYear: "halfYear", year: "year" };
  public chartTimeModelWording = { week : "本周", month: "本月", season: "本季", halfYear: "半年", year: "今年" };
  public selectChartTimeWording = "半年";
  
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
  private chartHalfTitle = ['12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月'];
  private chartHalfSite = [5, 15, 25, 10, 40, 25, 10, 20, 15, 50, 25, 10];
  private chartHalfRoom = [ 10, 20, 15, 20, 25, 10, 5, 15, 25, 10, 40, 60];

  ngOnInit(): void {
    this.selectChartTimeWording = this.chartTimeModelWording.halfYear;
    this.createChart(this.chartTimeModel.halfYear);
  }  
  
  constructor(
    private router : Router
  ) {}
  
  createChart(selectTimeModel: string){
    //https://www.chartjs.org/docs/latest/charts/line.html

    //圖表資料初始值。
    let chartTitle = this.chartHalfTitle;
    let charCharSite = this.chartHalfSite;
    let charCharRoom = this.chartHalfRoom;

    if(selectTimeModel === this.chartTimeModel.week) {
      chartTitle = this.chartWeekTitle;
      charCharSite = this.chartWeekSite;
      charCharRoom = this.chartWeekRoom;
    }
    if(selectTimeModel === this.chartTimeModel.month) {
      chartTitle = this.chartMonthTitle;
      charCharSite = this.chartMonthSite;
      charCharRoom = this.chartMonthRoom;
    }
    if(selectTimeModel === this.chartTimeModel.season) {
      chartTitle = this.chartSeaSonTitle;
      charCharSite = this.chartSeaSonSite;
      charCharRoom = this.chartSeaSonRoom;
    }
    if(selectTimeModel === this.chartTimeModel.halfYear) {
      chartTitle = this.chartHalfYearTitle;
      charCharSite = this.chartHalfYearSite;
      charCharRoom = this.chartHalfYearRoom;
    }
    if(selectTimeModel === this.chartTimeModel.year) {
      chartTitle = this.chartHalfTitle;
      charCharSite = this.chartHalfSite;
      charCharRoom = this.chartHalfRoom;
    }

    this.lineChart = new Chart("lineChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: chartTitle, // X 軸上的標籤
        datasets: [
          { label: "座位預約", data: charCharSite, borderColor: '#FBE0FF',}, // Dataset 1 的資料
          { label: "教室預約", data: charCharRoom, borderColor: '#661983',}  // Dataset 2 的資料
        ]
      },
      options: { aspectRatio:1}
    });
  }

  selectCharTimeModel(selectTimeModel: string) {
    this.lineChart.destroy(); // 銷毀現有圖表
    
    if(selectTimeModel === this.chartTimeModel.week) {
      this.selectChartTimeWording = this.chartTimeModelWording.week;
    }
    if(selectTimeModel === this.chartTimeModel.month) {
      this.selectChartTimeWording = this.chartTimeModelWording.month;
    }
    if(selectTimeModel === this.chartTimeModel.season) {
      this.selectChartTimeWording = this.chartTimeModelWording.season;
    }
    if(selectTimeModel === this.chartTimeModel.halfYear) {
      this.selectChartTimeWording = this.chartTimeModelWording.halfYear;
    }
    if(selectTimeModel === this.chartTimeModel.year) {
      this.selectChartTimeWording = this.chartTimeModelWording.year;
    }

    this.hiddenDialog();
    this.createChart(selectTimeModel)
  }

  public showDialog() {
    this.isHiddenDialog = false;
  }

  public hiddenDialog() {
    this.isHiddenDialog = true;
  }

  clickToReivewRoomDetail() {
    this.router.navigate(["/review-room-detail"]);
  }

}
