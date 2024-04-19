import { Injectable, OnInit } from '@angular/core';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { FireStoreService } from 'src/app/firebase-api/services/fire-store.service';
import { Room } from 'src/app/common/room-site/models/room.model';
import { Booking } from 'src/app/booking/models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewRoomTempService implements OnInit {
    
  // room教室 資料表名稱
  private RoomTable = this.fireStoreService.fireStoreTabelNameList.Room;
  // booking預約紀錄
  private bookingTable = this.fireStoreService.fireStoreTabelNameList.Booking;
  // 當前登入者 其 ownerId (user Id), 用於篩選資料
  private ownerId = "";
  // 當前 擁有者 之 "擁有" 所有空間 (教室)
  private ownerRoomList: Room[]= [];

  constructor(
    private googleAuthService: GoogleAuthService,
    private fireStoreService: FireStoreService,
  ) { }

  ngOnInit(): void {}

  /*
   *  取得 [今日剩餘]
   */
  getTodayRemanet() {    
    this.ownerId = this.googleAuthService.getCurrentUser().userFirestoreId;

    this.fireStoreService
      .getAll(this.RoomTable)
      .subscribe(roomList => {
        roomList.forEach(room => {
          // 取得 該 擁有者 之 空間(教室)
          if(room["ownerId"] === this.ownerId) {
            this.ownerRoomList.push(new Room(room));
          }
        });
        console.log(this.ownerRoomList);

        // 取得 該 擁有者 其 空間(教室)所有被預約紀錄
        const today = new Date();
        this.fireStoreService
          .getAll(this.bookingTable)
          .subscribe(bookingList => {
            bookingList.forEach(booking => {
              this.ownerRoomList.forEach(room => {
                if(booking["roomId"] === room.fireStoreId
                  && new Date(booking["startDate"]).getDate() === today.getDate()) {
                  room.bookingCount = 1;
                }
              })
            });

            // 計算 [今日剩餘]
            let bookingCount = 0;
            this.ownerRoomList.forEach(ownerRoom => {
              if(ownerRoom.bookingCount === 1) {
                bookingCount ++;
              }
            });

            console.log(bookingCount)

            if(bookingCount === 0) {
              return {remanent: 0, totalRoom: 0}
            } else {
              return {remanent: bookingCount, totalRoom: this.ownerRoomList.length}
            }

          });
      });

    return {remanent: 0, totalRoom: 0}
  }

  /*
   * 取得 [借用趨勢]
   */
  getBookingRoomTrend() {
    this.ownerId = this.googleAuthService.getCurrentUser().userFirestoreId;

    this.fireStoreService
      .getAll(this.RoomTable)
      .subscribe(roomList => {
        roomList.forEach(room => {
          // 取得 該 擁有者 之 空間(教室)
          if(room["ownerId"] === this.ownerId) {
            this.ownerRoomList.push(new Room(room));
          }
        });
        console.log(this.ownerRoomList);

        // 取得 該 擁有者 其 空間(教室)所有被預約紀錄
        this.fireStoreService
          .getAll(this.bookingTable)
          .subscribe(bookingList => {
            bookingList.forEach(booking => {
              this.ownerRoomList.forEach(room => {
                if(booking["roomId"] === room.fireStoreId) {

                }
              })
            })
          });
      });

  }

  /*
   * 取得 [剩餘空間] 
   */
  getRoomRemanet() {
    this.ownerId = this.googleAuthService.getCurrentUser().userFirestoreId;

    this.fireStoreService
      .getAll(this.RoomTable)
      .subscribe(roomList => {
        roomList.forEach(room => {
          // 取得 該 擁有者 之 空間(教室)
          if(room["ownerId"] === this.ownerId) {
            this.ownerRoomList.push(new Room(room));
          }
        });
        console.log(this.ownerRoomList);

        // 取得 該 擁有者 其 空間(教室)所有被預約紀錄
        this.fireStoreService
          .getAll(this.bookingTable)
          .subscribe(bookingList => {
            bookingList.forEach(booking => {
              this.ownerRoomList.forEach(room => {
                if(booking["roomId"] === room.fireStoreId) {

                }
              })
            })
          });
      });

  }


}
