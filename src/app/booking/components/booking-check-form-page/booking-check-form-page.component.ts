import { Component } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { RoomSiteService } from 'src/app/common/room-site/services/room-site.service';
import { Room } from 'src/app/common/room-site/models/room.model';
import { ActivatedRoute } from '@angular/router';
import { RouteUrlRecordService } from 'src/app/auth-route/services/route-url-record.service';
import { GoogleAuthService } from 'src/app/auth-route/services/google-auth.service';
import { GoogleAuthUser } from 'src/app/auth-route/models/google-auth-user.model';
import { DialogItemModel } from 'src/app/common/dialog/models/item.model';

@Component({
  selector: 'app-booking-check-form-page',
  templateUrl: './booking-check-form-page.component.html',
  styleUrls: ['./booking-check-form-page.component.scss']
})
export class BookingCheckFormPageComponent {

  selectDate = "";
  selectDay = "";
  startTime = "";
  endTime = "";
  bookingType = "";
  roomList = new Array<Room>();
  selectRoom!: Room;
  currentUser!: GoogleAuthUser;
  dialogRoomList: DialogItemModel[] = [];
  isHiddenDialogRoom = true;
  dialogUserInfo: DialogItemModel[] = [];
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
              new Room(room['fireStoreId'],room['name'],room['ownerId'],room['ownerMail'])
            );
            this.dialogRoomList.push({id:room['fireStoreId'] , name: room['name']});
          });
          this.selectRoom = this.roomList[0];
        },
        error => {
          alert("教室資訊無法取得,錯誤資訊 : " + error);
        }
      );

    // 提取日期参数
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectDate = params['selectDate'];
      this.startTime = params['startTime'];
      this.endTime = params['endTime'];
      this.bookingType = params['bookingType'];

      const dayOfWeek = (new Date(this.selectDate)).getDay();
      //判斷星期
      switch(dayOfWeek) {        
        case 0:
          // 星期日
          this.selectDay = "(日)";
          break;
        case 1:
          // 星期一
          this.selectDay = "(一)";
          break;
        case 2:
          // 星期二
          this.selectDay = "(二)";
          break;
        case 3:
          // 星期三
          this.selectDay = "(三)";
          break;
        case 4:
          // 星期四
          this.selectDay = "(四)";
          break;
        case 5:
          // 星期五
          this.selectDay = "(五)";
          break;
        case 6:
          // 星期六
          this.selectDay = "(六)";
          break;
      }
    });
  }

  selectedRoom(_selectRoomId: string) {
    this.selectRoom = this.roomList.filter(room => {return room.fireStoreId === _selectRoomId; })[0];
    console.log(this.selectRoom);
  }

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
      alert("無法取得使用者 id ，請重新登入");
      return;
    }

    const bookingData = { 
      fireStoreId: "",
      userId: this.currentUser.id, 
      mail: this.currentUser.email, 
      startDate: this.selectDate, 
      endDatae: this.selectDate, 
      startTime: this.startTime,
      endTime: this.endTime,
      bookingType: this.bookingType,
      roomId: this.selectRoom.fireStoreId,
      roomName: this.selectRoom.name,
      siteId: "",
      siteName: "",
    };

    this.bookingService.post(bookingData)      
      .then(() => {
        alert("送出成功, 預約時間: " + this.selectDate + " " + this.startTime + "~" + this.endTime + " ,地點:" + this.selectRoom.name + "預約成功。");
        this.routeUrlRecordService.nextPage("/home", {});
      })
      .catch((error) => {
        console.log(error);
        alert("資料送出失敗,請重新輸入");
      });
    alert("資料傳輸中");
  }

  selectMap() {
    //this.router.navigate(["map"]);
  }
}
