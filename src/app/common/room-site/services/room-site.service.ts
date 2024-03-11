import { Injectable } from '@angular/core';
import { FireStoreService } from 'src/app/firebase-api/services/fire-store.service';

@Injectable({
  providedIn: 'root'
})
export class RoomSiteService {

  private roomTable = this.fireStoreService.fireStoreTabelNameList.Room;

  constructor(
    private fireStoreService: FireStoreService,
  ) { }

  /* 
   * 取得所有 教室之資訊列表
   */
  getAllRoomList() {
    return this.fireStoreService.getAll(this.roomTable);
  }

}
