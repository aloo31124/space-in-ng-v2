import { Injectable } from '@angular/core';
import { FireStoreService } from 'src/app/firebase-api/services/fire-store.service';

@Injectable({
  providedIn: 'root'
})
export class RoomSiteService {

  // 教室表
  private roomTable = this.fireStoreService.fireStoreTabelNameList.Room;
  // 座位表
  private siteTable = this.fireStoreService.fireStoreTabelNameList.RoomToSite;

  constructor(
    private fireStoreService: FireStoreService,
  ) { }

  /* 
   * 取得所有 教室之資訊列表
   */
  getAllRoomList() {
    return this.fireStoreService.getAll(this.roomTable);
  }

  /* 
   * 取得所有 座位之資訊列表
   */
  getAllSiteList() {
    return this.fireStoreService.getAll(this.siteTable);
  }

}
