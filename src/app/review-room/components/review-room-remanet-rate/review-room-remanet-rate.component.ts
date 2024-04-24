import { Component } from '@angular/core';
import { DialogItemModel } from 'src/app/common/dialog/models/item.model';
import { RateModel } from '../../models/rate.model';
import { ReviewRoomService } from '../../services/review-room.service';


import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { FireStoreService } from 'src/app/firebase-api/services/fire-store.service';
import { Room } from 'src/app/common/room-site/models/room.model';


@Component({
  selector: 'app-review-room-remanet-rate',
  templateUrl: './review-room-remanet-rate.component.html',
  styleUrls: ['./review-room-remanet-rate.component.scss']
})
export class ReviewRoomRemanetRateComponent {

  // 畫面正在 loading 中
  isLoading = true;

  //選擇空間種類 dialog
  dialogRoomTypeList: DialogItemModel[] = [{id:"all", name: "全部"}, {id:"room", name: "教室預約"}, {id:"site", name:"座位預約"}];
  isDialogHiddenRoomType = true;

  //選擇剩餘空間 dialog
  dialogRemainRoomRate: DialogItemModel[] = [{id:"1", name:"10%"}, {id:"2", name:"20%"}, {id:"3", name:"30%"}, {id:"4", name:"40%"}, {id:"5", name:"50%"}];
  isDialogHiddenRemainRommRate = true;
  
  // 選擇 顯示剩餘率 之 空間種類
  _selectRoomType: DialogItemModel = this.dialogRoomTypeList[0];

  // 該空間 其 剩餘率 紀錄
  rateList: RateModel[] = [];

  // 當前選擇呈現剩餘率 %
  showRate = 30;

  // 當前 剩餘行事曆 所切換日期，於以換算月份
  selectDate = "";
  
  
  constructor(
    private googleAuthService: GoogleAuthService,
    private fireStoreService: FireStoreService,
  ) { }

  ngOnInit(): void {
    const currentDate = new Date();
    this.selectDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-1";
    this.getRateList();
  }

  /*
   * 從 service => api 取 該擁有者空間剩餘率
   */
   // 原本寫法, cloud fun 需要改善 key 搜尋 => 保留
/* 
  public getRateList() {
    this.isLoading = true;
    this.reviewRoomService
      .getBookingRate(this.selectDate, this._selectRoomType.id)
      .subscribe(responseData => {
        this.rateList = responseData;
        console.log(this.rateList);
        this.isLoading = false;
      });
  }
 */
  getRateList(){
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

            console.log("剩餘 yo ha!");
            console.log(bookingListFilter);

            const totalRoom = 3;
            const currentDate = new Date(this.selectDate);
            const month = currentDate.getMonth() + 1;
            const lastDate = (new Date(2024, month, 0)).getDate();
            let resultList = [];
            for(let i=0; i<lastDate; i++) {
                let bookingCounter = 0;
                bookingListFilter.forEach(booking => {
                    if(i+1 === (new Date(booking.startDate)).getDate()) {
                        bookingCounter ++;
                    }
                });
                let result = {
                    date: "2024-" + month + "-" + (i + 1),
                    rate: new Number(((totalRoom - bookingCounter) / totalRoom) * 100).toFixed(2),
                }

                resultList.push(result);
            }

            // ---------- 顯示圖表 start ----------
            console.log(resultList);
            //this.rateList = resultList;

            // ---------- 顯示圖表 end ----------

            // ==================== 計算 end ====================

            this.isLoading = false;


          });
      });
  }


  

  /*
   * dialog 選擇行事曆呈現 剩餘率 
   */
  public selectDialogRate(selectRateTypeId: string) {
    this.dialogRemainRoomRate.forEach(rateType => {
      const rateChar = rateType.name.split("%");
      if(rateType.id === selectRateTypeId && !isNaN(+rateChar[0])) {
        this.showRate = +rateChar[0];
      }
    });
  }

  /*
   * dialog 選擇行事曆呈現 空間種類
   */
  public selectDialogRoomType(selectRoomTypeId: string) {
    this.dialogRoomTypeList.forEach(roomType => {
      if(roomType.id === selectRoomTypeId) {
        this._selectRoomType = roomType;
      }
    });
  }

  /*
   * 更新日期元件 之 日期資訊 
   * 接收 行事曆 component 的 emit
   */
  getEmitterSelectDay(selectDay: string) {
    this.selectDate = selectDay;
    this.getRateList();
  }

}
