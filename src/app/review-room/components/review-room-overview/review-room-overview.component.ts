import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';
import { ReviewRoomService } from '../../services/review-room.service';
import { ChartTimeType } from '../../models/chartTimeType.model';
import { ChartTimeWord } from '../../models/chartTimeWord.model';
import { ChartTimeModel } from '../../models/chartTimeModel.model';
import { DialogItemModel } from 'src/app/common/dialog/models/item.model';

@Component({
  selector: 'app-review-room-overview',
  templateUrl: './review-room-overview.component.html',
  styleUrls: ['./review-room-overview.component.scss']
})
export class ReviewRoomOverviewComponent {

  // 資料仍在 loading中, 顯示 loading mask
  isLoading = true;

  public chartTimeType = new ChartTimeType();
  public chartTimeWording = new ChartTimeWord();
  public selectChartTimeWording = this.chartTimeWording.halfYear; 

  public lineChart: any;
  public isHiddenDialog = true;
  public dialogChartTimeItem: DialogItemModel[] = [
    {id:this.chartTimeWording.week , name: this.chartTimeWording.week},
    {id:this.chartTimeWording.month , name: this.chartTimeWording.month},
    {id:this.chartTimeWording.season , name: this.chartTimeWording.season},
    {id:this.chartTimeWording.halfYear , name: this.chartTimeWording.halfYear},
    {id:this.chartTimeWording.year , name: this.chartTimeWording.year},
  ];
  
  constructor(
    private router : Router,
    private reviewRoomService : ReviewRoomService,
  ) {}

  ngOnInit(): void {
    this.selectChartTimeWording = this.chartTimeWording.halfYear;
    this.createChart(this.chartTimeType.halfYear);
  } 
  
  createChart(selectTimeModel: string){
    //https://www.chartjs.org/docs/latest/charts/line.html


    //圖表資料初始值為週。
    let chartTitle:string[] =[];
    let charCharSite:number[] = [];
    let charCharRoom:number[] = [];

    const chartTimeModel = this.reviewRoomService.getChartByTimeType(selectTimeModel);
    chartTimeModel
        .subscribe(
          (responseData) => {
            
            chartTitle = responseData.timeTitle;
            charCharSite = responseData.siteCount;
            charCharRoom = responseData.roomCount;
  
            this.lineChart = new Chart("lineChart", {
              type: 'line', //this denotes tha type of chart
              data: {// values on X-Axis
                labels: chartTitle, // X 軸上的標籤
                datasets: [
                  { label: this.chartTimeWording.booking_site, data: charCharSite, borderColor: '#FBE0FF',}, // Dataset 1 的資料
                  { label: this.chartTimeWording.booking_room, data: charCharRoom, borderColor: '#661983',}  // Dataset 2 的資料
                ]
              },
              options: { aspectRatio:1}
            });

            this.isLoading = false;
  
          },
          (error) => {
            console.log(error);
            alert("取得借用趨勢資料錯誤, 錯誤訊息為 : " + error);
          }
        );
  }

  selectCharTimeModel(selectTimeModel: string) {
    this.isLoading = true;
    this.lineChart.destroy(); // 銷毀現有圖表
    
    if(selectTimeModel === this.chartTimeWording.week) {
      this.selectChartTimeWording = this.chartTimeWording.week;
      this.createChart(this.chartTimeType.week);
    }
    if(selectTimeModel === this.chartTimeWording.month) {
      this.selectChartTimeWording = this.chartTimeWording.month;
      this.createChart(this.chartTimeType.month);
    }
    if(selectTimeModel === this.chartTimeWording.season) {
      this.selectChartTimeWording = this.chartTimeWording.season;
      this.createChart(this.chartTimeType.season);
    }
    if(selectTimeModel === this.chartTimeWording.halfYear) {
      this.selectChartTimeWording = this.chartTimeWording.halfYear;
      this.createChart(this.chartTimeType.halfYear);
    }
    if(selectTimeModel === this.chartTimeWording.year) {
      this.selectChartTimeWording = this.chartTimeWording.year;
      this.createChart(this.chartTimeType.year);
    }
  }
  
  clickToReivewRoomDetail() {
    this.router.navigate(["/review-room-detail"]);
  }

}
