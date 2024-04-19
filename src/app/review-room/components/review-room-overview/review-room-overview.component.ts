import { Component, OnInit } from '@angular/core';
import { ReviewType } from '../../models/review-type.model';
import { TodayRemanent } from '../../models/today-remanent.model';
import { ReviewRoomTempService } from '../../services/review-room-temp.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { FireStoreService } from 'src/app/firebase-api/services/fire-store.service';
import { Room } from 'src/app/common/room-site/models/room.model';

@Component({
  selector: 'app-review-room-overview',
  templateUrl: './review-room-overview.component.html',
  styleUrls: ['./review-room-overview.component.scss']
})
export class ReviewRoomOverviewComponent implements OnInit {

  // 選擇 總攬種類模型
  reviewType = new ReviewType();

  // 當前選擇 總攬種類
  selectReviewType = this.reviewType.BOOKING_TREND;

  // 今日剩餘比率
  todayRemanent: TodayRemanent = {remanent: 0, totalRoom: 0};

  constructor(
    //private reviewRoomService: ReviewRoomService,
    private ReviewRoomTempService: ReviewRoomTempService,
    private googleAuthService: GoogleAuthService,
    private fireStoreService: FireStoreService,
  ) {}

  ngOnInit(): void {
    // 取得 今日剩餘比率
    /* 
    this.reviewRoomService
      .getTodayRemanent()
      .subscribe(todayRemanent => {
        this.todayRemanent = todayRemanent;
      });
     */  
      this.getTodayRemanet();
      console.log(this.todayRemanent);
  }


  /*
   *  取得 [今日剩餘]
   */
  getTodayRemanet() {    
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
            bookingList.forEach(booking => {
              ownerRoomList.forEach(room => {
                if(booking["roomId"] === room.fireStoreId
                  && new Date(booking["startDate"]).getDate() === today.getDate()) {
                  room.bookingCount = 1;
                }
              })
            });

            // 計算 [今日剩餘]
            let bookingCount = 0;
            ownerRoomList.forEach(ownerRoom => {
              if(ownerRoom.bookingCount === 1) {
                bookingCount ++;
              }
            });

            console.log(bookingCount)

            if(bookingCount === 0) {
              this.todayRemanent = {remanent: 0, totalRoom: 0};
            } else {
              this.todayRemanent = {remanent: ownerRoomList.length - bookingCount, totalRoom: ownerRoomList.length};
            }

          });
      });
  }



  /*
   * 點選 總攬種類 
   */
  changeReviewType(selectType: string){
    this.selectReviewType = selectType;
  }

  /*
   * 取得今日剩餘比率 
   */
  getToDayRate() {
    if(this.todayRemanent.totalRoom === 0) {
      return 100;
    }
    return ((this.todayRemanent.remanent / this.todayRemanent.totalRoom) * 100).toFixed(2);
  }

  /*
   * 回覆剩餘文字 
   */
  getRateWording() {
    return this.todayRemanent.remanent.toString() +"/" + this.todayRemanent.totalRoom.toString();
  }

}
