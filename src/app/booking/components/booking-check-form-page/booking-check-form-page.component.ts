import { Component } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { RoomSiteService } from 'src/app/common/room-site/services/room-site.service';
import { Room } from 'src/app/common/room-site/models/room.model';
import { ActivatedRoute } from '@angular/router';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { GoogleAuthUser } from 'src/app/auth-route/models/google-auth-user.model';
import { DialogItemModel } from 'src/app/common/dialog/models/item.model';
import { Site } from 'src/app/common/room-site/models/site.model';

@Component({
  selector: 'app-booking-check-form-page',
  templateUrl: './booking-check-form-page.component.html',
  styleUrls: ['./booking-check-form-page.component.scss']
})
export class BookingCheckFormPageComponent {

  // booking 種類, 教室預約/座位預約
  bookingType = "";

  // 教室 list
  roomList = new Array<Room>();
  // 選擇教室
  selectRoom!: Room;
  // 教室 dialog 資訊
  dialogRoomList: DialogItemModel[] = [];
  // 教室dialog 是否隱藏 
  isHiddenDialogRoom = true;

  // 選擇座位
  selectSite!: Site;
  // 座位 dialog 資訊
  dialogSiteList: DialogItemModel[] = [];
  // 座位 dialog是否隱藏 
  isHiddenDialogSite = true;
  // 座位 所有資訊 
  dialogSiteAllList: Site[] =[];

  // 當前使用者資訊
  currentUser!: GoogleAuthUser;
  // 使用者 dialog 資訊
  dialogUserInfo: DialogItemModel[] = [];
  // 使用者 dialog 是否隱藏 
  isHiddenDialogUserInfo = true;

  constructor(
    private routeUrlRecordService: RouteUrlRecordService<{}>,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private roomSiteService: RoomSiteService,
    private googleAuthService: GoogleAuthService,
  ) {
  }

  ngOnInit(): void {
    // 取得使用者資訊
    this.currentUser = this.googleAuthService.getCurrentUser();
    if(!this.currentUser) {
      alert("無法取得使用者資訊，請重新登入。");
      this.routeUrlRecordService.nextPage("/", {});
    }
    this.dialogUserInfo.push({id: "0", name: "姓名: " + this.currentUser.name});
    this.dialogUserInfo.push({id: "1", name: "信箱: " + this.currentUser.email});


    // 取得教室資訊
    this.roomSiteService
      .getAllRoomList()
      .subscribe(
        responseData => {
          responseData.forEach(room => {
            this.roomList.push(
              new Room(room)
            );
            this.dialogRoomList.push({id:room['fireStoreId'] , name: room['name']});
          });
          this.selectRoom = this.roomList[0];
        },
        error => {
          alert("教室資訊無法取得,錯誤資訊 : " + error);
        }
      );
    
    // 取得所有 座位資訊
    this.roomSiteService
        .getAllSiteList()
        .subscribe(dataList => {
          dataList.forEach(site => {
            this.dialogSiteAllList.push(
              new Site(site)
            );
          });

          this.dialogSiteAllList.forEach(site => { 
            if(site.roomId === this.selectRoom.fireStoreId) {
              this.selectSite = site;
            }
          });
        });

    // 取得 booking 種類
    this.activatedRoute.queryParams.subscribe(params => {
      this.bookingType = params['bookingType'];
    });
  }

  /*
   *  從 service 取得 選擇日期
   */
  getSelectDate() {
    return this.bookingService.getSelectDate();
  }

  /*
   * 從 service 取得 開始時間 
   */
  getStartTime() {
    return this.bookingService.getStartTime();
  }

  /*
   * 從 service 取得 結束時間 
   */
  getEndTime() {
    return this.bookingService.getEndTime();
  }

  /*
   * 教室 dialog 選擇之後觸發 
   */
  selectedRoom(_selectRoomId: string) {
    this.selectRoom = this.roomList.filter(room => {return room.fireStoreId === _selectRoomId; })[0];
    // 預設選擇一個 座位空間
    this.selectedSite((this.dialogSiteAllList.filter(site => {return site.roomId === this.selectRoom.fireStoreId})[0]).name);
  }

  /* 
   * 座位 dialog 選擇觸發
   */
  selectedSite(_selectSiteId: string) {
    this.selectSite = this.dialogSiteAllList.filter(site => {return site.name === _selectSiteId; })[0];
  }

  /*
   * 按下送出 icon , post booking預約資訊 
   */
  submitBooking() {

    if(!this.currentUser) {
      alert("使用者資訊不足，請重新登入");
      return;
    }

    if(this.currentUser.email === "") {
      alert("無法取得使用者 email，請重新登入");
      return;
    }

    if(this.currentUser.id === "") {
      alert("無法取得使用者 id，請重新登入");
      return;
    }

    const bookingData = { 
      fireStoreId: "",
      userId: this.currentUser.id, 
      mail: this.currentUser.email, 
      startDate: this.getSelectDate(), 
      endDatae: this.getSelectDate(), 
      startTime: this.getStartTime(),
      endTime: this.getEndTime(),
      bookingType: this.bookingType,
      roomId: this.selectRoom.fireStoreId,
      roomName: this.selectRoom.name,
      siteId: "",
      siteName: "",
    };

    this.bookingService.post(bookingData)      
      .then(() => {
        alert("送出成功, 預約時間: " + this.getSelectDate() + " " + this.getStartTime() + "~" + this.getEndTime() + " ,地點:" + this.selectRoom.name + "預約成功。");
        this.routeUrlRecordService.nextPage("/home", {});
      })
      .catch((error) => {
        console.log(error);
        alert("資料送出失敗,請重新輸入");
      });
    alert("資料傳輸中");
  }

  /*
   * 點選 座位 dialog 
   */
  clickSiteShowDialog() {
    this.isHiddenDialogSite=false;
    this.dialogSiteList = [];
    this.dialogSiteAllList.forEach(site => {
      if(site.roomId === this.selectRoom.fireStoreId) {
        this.dialogSiteList.push({id:site.name , name: site.name});
      }
    });
    console.log(this.dialogSiteList);
  }

  selectMap() {
    //this.router.navigate(["map"]);
  }
}
