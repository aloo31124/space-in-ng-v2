import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';
import { ReviewRoomService } from '../../services/review-room.service';
import { ChartTime } from '../../models/chartTime.model';
import { ChartTimeWord } from '../../models/chartTimeWord.model';

@Component({
  selector: 'app-review-room-overview',
  templateUrl: './review-room-overview.component.html',
  styleUrls: ['./review-room-overview.component.scss']
})
export class ReviewRoomOverviewComponent {


  public chartTimeModel = new ChartTime();
  public chartTimeModelWording = new ChartTimeWord();
  public selectChartTimeWording = this.chartTimeModelWording.halfYear; 

  public lineChart: any;
  public isHiddenDialog = true;
  public dialogChartTimeItem = [
    this.chartTimeModelWording.week,
    this.chartTimeModelWording.month,
    this.chartTimeModelWording.season,
    this.chartTimeModelWording.halfYear,
    this.chartTimeModelWording.year,
  ];
  
  constructor(
    private router : Router,
    private reviewRoomService : ReviewRoomService,
  ) {}

  ngOnInit(): void {
    this.selectChartTimeWording = this.chartTimeModelWording.halfYear;
    this.createChart(this.chartTimeModel.halfYear);
  } 
  
  createChart(selectTimeModel: string){
    //https://www.chartjs.org/docs/latest/charts/line.html

    //圖表資料初始值為週。
    let chartTitle = this.reviewRoomService.getWeekTitle();
    let charCharSite = this.reviewRoomService.getWeekSiteData();
    let charCharRoom = this.reviewRoomService.getWeekRoomData();

    if(selectTimeModel === this.chartTimeModel.week) {
      chartTitle = this.reviewRoomService.getWeekTitle();
      charCharSite = this.reviewRoomService.getWeekSiteData();
      charCharRoom = this.reviewRoomService.getWeekRoomData();
    }
    else if(selectTimeModel === this.chartTimeModel.month) {
      chartTitle = this.reviewRoomService.getMonthTitle();
      charCharSite = this.reviewRoomService.getMonthSiteData();
      charCharRoom = this.reviewRoomService.getMonthRoomData();
    }
    else if(selectTimeModel === this.chartTimeModel.season) {
      chartTitle = this.reviewRoomService.getSeasonTitle();
      charCharSite = this.reviewRoomService.getSeasonSiteData();
      charCharRoom = this.reviewRoomService.getSeasonRoomData();
    }
    else if(selectTimeModel === this.chartTimeModel.halfYear) {
      chartTitle = this.reviewRoomService.getHalfYearTitle();
      charCharSite = this.reviewRoomService.getHalfYearSiteData();
      charCharRoom = this.reviewRoomService.getHalfYearRoomData();
    }
    else if(selectTimeModel === this.chartTimeModel.year) {
      chartTitle = this.reviewRoomService.getYearTitle();
      charCharSite = this.reviewRoomService.getYearSiteData();
      charCharRoom = this.reviewRoomService.getYearRoomData();
    } 

    this.lineChart = new Chart("lineChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: chartTitle, // X 軸上的標籤
        datasets: [
          { label: this.chartTimeModelWording.booking_site, data: charCharSite, borderColor: '#FBE0FF',}, // Dataset 1 的資料
          { label: this.chartTimeModelWording.booking_room, data: charCharRoom, borderColor: '#661983',}  // Dataset 2 的資料
        ]
      },
      options: { aspectRatio:1}
    });
  }

  selectCharTimeModel(selectTimeModel: string) {
    this.lineChart.destroy(); // 銷毀現有圖表
    
    if(selectTimeModel === this.chartTimeModelWording.week) {
      this.selectChartTimeWording = this.chartTimeModelWording.week;
      this.createChart(this.chartTimeModel.week);
    }
    if(selectTimeModel === this.chartTimeModelWording.month) {
      this.selectChartTimeWording = this.chartTimeModelWording.month;
      this.createChart(this.chartTimeModel.month);
    }
    if(selectTimeModel === this.chartTimeModelWording.season) {
      this.selectChartTimeWording = this.chartTimeModelWording.season;
      this.createChart(this.chartTimeModel.season);
    }
    if(selectTimeModel === this.chartTimeModelWording.halfYear) {
      this.selectChartTimeWording = this.chartTimeModelWording.halfYear;
      this.createChart(this.chartTimeModel.halfYear);
    }
    if(selectTimeModel === this.chartTimeModelWording.year) {
      this.selectChartTimeWording = this.chartTimeModelWording.year;
      this.createChart(this.chartTimeModel.year);
    }
  }
  
  clickToReivewRoomDetail() {
    this.router.navigate(["/review-room-detail"]);
  }

}
