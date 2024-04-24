import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { ReviewRoomService } from '../../services/review-room.service';
import { ChartTimeType } from '../../models/chartTimeType.model';
import { ChartTimeWord } from '../../models/chartTimeWord.model';
import { DialogItemModel } from 'src/app/common/dialog/models/item.model';


import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { FireStoreService } from 'src/app/firebase-api/services/fire-store.service';
import { Room } from 'src/app/common/room-site/models/room.model';

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
    private reviewRoomService: ReviewRoomService,
    private googleAuthService: GoogleAuthService,
    private fireStoreService: FireStoreService,
  ) {}

  ngOnInit(): void {
    this.selectChartTimeWording = this.chartTimeWording.halfYear;
    this.createChart(this.chartTimeType.halfYear);
  } 
  

  /*
    依照與得資料, 顯示折線圖 
   */
   // 原本寫法, cloud fun 需要改善 key 搜尋 => 保留
  /*  
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
 */
  createChart(selectTimeModel: string){
    let ownerId = this.googleAuthService.getCurrentUser().userFirestoreId;
    let ownerRoomList: Room[] = [];

    // 取得 Room教室
    this.fireStoreService
      .getAll("Room")
      .subscribe(roomList => {
        roomList.forEach(room => {
          // 取得 該 擁有者 之 空間(教室)
          if(room["ownerId"] === ownerId) {
            ownerRoomList.push(new Room(room));
          }
        });

        // 取得 該 擁有者 其 空間(教室)所有被預約紀錄
        const today = new Date();
        this.fireStoreService
          .getAll("Booking")
          .subscribe(bookingList => {
            let bookingListFilter: any[] = [];
            bookingList.forEach(booking => {
              ownerRoomList.forEach(room => {
                if(booking["roomId"] === room.fireStoreId) {
                  bookingListFilter.push(booking);
                }
              })
            });

            // ==================== 計算 start ====================

            console.log("趨勢 yoyo 3");
            console.log(bookingListFilter);

                  

            // 初始參數
            const currentDate = new Date();
            let countTime = 7;
            let timeInterval = "day" //時間間隔
            let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() , (currentDate.getDate() - countTime + 2));
            let startMonth = startDate.getMonth() + 1;

            if(selectTimeModel === "season") {
              countTime = 3; // 三個月
              timeInterval = "month" //時間間隔：月
              startDate = new Date(currentDate.getFullYear(), (currentDate.getMonth() + 1) - countTime , 1);
              startMonth = startDate.getMonth() + 1;
            }
            else if (selectTimeModel === "halfYear") {
              countTime = 6; // 6個月
              timeInterval = "month" //時間間隔：月
              startDate = new Date(currentDate.getFullYear(), (currentDate.getMonth() + 1) - countTime , 1);    
              startMonth = startDate.getMonth() + 1;
            }
            else if (selectTimeModel === "year") {
              countTime = 12; // 12個月
              timeInterval = "month" //時間間隔：月
              startDate = new Date(currentDate.getFullYear(), (currentDate.getMonth() + 1) - countTime , 1);     
              startMonth = startDate.getMonth() + 1;
            }
            else if (selectTimeModel === "week") {
              countTime = 7; // 7天
              timeInterval = "day" //時間間隔: 天
              startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() , (currentDate.getDate() - countTime + 2));
              startMonth = startDate.getMonth() + 1;
            }
            else if (selectTimeModel === "month") {
              countTime = 6; // 6週
              timeInterval = "week" //時間間隔
              let currentDay = currentDate.getDay(); // 當前星期
              // 當周星期一之日期
              let monDayDateThisWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), (currentDate.getDate() - currentDay + 1));
              // 依照每週週期, 推算第一週之星期一日期
              startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() , (monDayDateThisWeek.getDate() - (countTime-1)*7));
              startMonth = startDate.getMonth() + 1;
            }



            let arr = {
                timeTitle : Array<string>(),
                roomCount : Array<number>(),
                siteCount : Array<number>(),
                roomId : Array<string>(),
            }

            for(let i=0; i<countTime; i++) {
              // 開始計算之 月，日
              let index = 0;
              
              if(timeInterval === "month") {
                index = (startMonth + i);
                arr.timeTitle.push(index.toString() + "月");
              }
              else if(timeInterval === "week") {
                index = startDate.getDate() + i*7;
                arr.timeTitle.push((i + 1).toString() + "週")
              }
              else if(timeInterval === "day") {
                index = startDate.getDate() + i;
                arr.timeTitle.push(index.toString());
              }
              
              arr.roomCount.push(0);
              arr.siteCount.push(0);

              bookingListFilter.forEach((item) => {
                    // 不在日期範圍內, 跳過
                    if(!this.isInTimeRange(timeInterval, index, new Date(item.startDate), startDate)){
                        return;
                    }
                    // 空間id
                    arr.roomId[i] = "yo";
                    // 教室預約 統計
                    if(item.bookingType === "room"){
                      ++arr.roomCount[i];
                    }
                    // 教室預約 統計
                    if(item.bookingType === "site"){
                      ++arr.siteCount[i];
                    }
                })
            }

            console.log("趨勢計算 結束拉！")
            console.log(arr);

            // ---------- 顯示圖表 start ----------

            
            const chartTitle = arr.timeTitle;
            const charCharSite = arr.siteCount;
            const charCharRoom = arr.roomCount;
  
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
            

            // ---------- 顯示圖表 end ----------

            // ==================== 計算 end ====================

            this.isLoading = false;

          });
      });
  }


  /*
   * 確認 該日期是否在範圍內
   */
  isInTimeRange(timeInterval:string, index:number, date:Date, startdate:Date) {
    if (timeInterval === "month") {
        //該月份第一天
        const startDate = new Date(startdate.getFullYear(), (index - 1), 1); //月份減1
        //該月份最後一天
        const endDate = new Date(startdate.getFullYear(), index, 0);
        // 當前日期 在 範圍內
        return (startDate <= date) && (date <= endDate);
    }
    else if (timeInterval === "week") {
        //該週第一天
        const startDate = new Date(startdate.getFullYear(), startdate.getMonth(), index);
        //該週最後一天
        const endDate = new Date(startdate.getFullYear(), startdate.getMonth(), index + 7);
        // 當前日期 在 範圍內
        return (startDate <= date) && (date <= endDate);
    } 
    else if (timeInterval === "day") {
        const checkDate = new Date(startdate.getFullYear(), startdate.getMonth(), index);
        return (checkDate.getTime() === date.getTime());
    }
    return false;
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
