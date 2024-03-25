import { Component } from '@angular/core';
import { DialogItemModel } from 'src/app/common/dialog/models/item.model';
import { RateModel } from '../../models/rate.model';
import { ReviewRoomService } from '../../services/review-room.service';

@Component({
  selector: 'app-review-room-remanet-rate',
  templateUrl: './review-room-remanet-rate.component.html',
  styleUrls: ['./review-room-remanet-rate.component.scss']
})
export class ReviewRoomRemanetRateComponent {

  // 畫面正在 loading 中
  isLoading = true;

  //選擇空間種類 dialog
  dialogRoomTypeList: DialogItemModel[] = [{id:"1", name: "全部"}, {id:"2", name: "教室預約"}, {id:"3", name:"座位預約"}];
  isDialogHiddenRoomType = true;

  //選擇剩餘空間 dialog
  dialogRemainRoomRate: DialogItemModel[] = [{id:"1", name:"10%"}, {id:"2", name:"20%"}, {id:"3", name:"30%"}, {id:"4", name:"40%"}, {id:"5", name:"50%"}];
  isDialogHiddenRemainRommRate = true;

  // 空間種類 wording
  roomType = { all: "全部", roomBooking: "教室預約", siteBooking: "座位預約" };
  
  // 選擇 顯示剩餘率 之 空間種類
  _selectRoomType = this.roomType.all;

  // 該空間 其 剩餘率 紀錄
  rateList: RateModel[] = [];

  // 當前選擇呈現剩餘率 %
  showRate = 30;
  
  
  constructor(
    private reviewRoomService: ReviewRoomService,
  ) { }

  ngOnInit(): void {
    this.getRateList();
  }

  /*
   * 從 service => api 取 該擁有者空間剩餘率
   */
  public getRateList() {
    this.reviewRoomService
      .getBookingRate(3)
      .subscribe(responseData => {
        this.rateList = responseData;
        this.isLoading = false;
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
        this._selectRoomType = roomType.name;
      }
    });
  }

}
