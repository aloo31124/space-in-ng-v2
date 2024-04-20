import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { ReviewRoomService } from '../../services/review-room.service';
import { ChartTimeType } from '../../models/chartTimeType.model';
import { ChartTimeWord } from '../../models/chartTimeWord.model';
import { DialogItemModel } from 'src/app/common/dialog/models/item.model';

@Component({
  selector: 'app-review-room-trend',
  templateUrl: './review-room-trend.component.html',
  styleUrls: ['./review-room-trend.component.scss']
})
export class ReviewRoomTrendComponent {

  // 資料仍在 loading中, 顯示 loading mask
  isLoading = true;

  chartTimeType = new ChartTimeType();
  chartTimeWording = new ChartTimeWord();
  selectChartTimeWording = this.chartTimeWording.halfYear; 

  lineChart: any;
  isHiddenDialog = true;
  dialogChartTimeItemList: DialogItemModel[] = [
    {id:this.chartTimeType.week , name: this.chartTimeWording.week},
    {id:this.chartTimeType.month , name: this.chartTimeWording.month},
    {id:this.chartTimeType.season , name: this.chartTimeWording.season},
    {id:this.chartTimeType.halfYear , name: this.chartTimeWording.halfYear},
    {id:this.chartTimeType.year , name: this.chartTimeWording.year},
  ];
  
  constructor(
    private reviewRoomService : ReviewRoomService,
  ) {}

  ngOnInit(): void {
    this.selectChartTimeWording = this.chartTimeWording.halfYear;
    this.createChart(this.chartTimeType.halfYear);
  } 
  

  /*
    依照與得資料, 顯示折線圖 
   */
   // 原本寫法, cloud fun 需要改善 key 搜尋 => 保留
  createChart(selectTimeModel: string){
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

  selectCharTimeModel(selectTimeTypeId: string) {
    this.isLoading = true;
    this.lineChart.destroy(); // 銷毀現有圖表

    this.dialogChartTimeItemList.forEach(timeType => {
      if(timeType.id === selectTimeTypeId) {
        this.selectChartTimeWording = timeType.name;
        this.createChart(timeType.id);
      }
    });
  }

}
