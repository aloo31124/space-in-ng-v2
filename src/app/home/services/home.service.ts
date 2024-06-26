import { Injectable } from '@angular/core';
import { FireStoreService } from 'src/app/firebase-api/services/fire-store.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private fireStoreService: FireStoreService,
  ) { }

  /*
   * 檢查是否顯示 [空間總覽] 
   */
  getAllRoom() {
    const roomTable = this.fireStoreService.fireStoreTabelNameList.Room;
    return this.fireStoreService.getAll(roomTable)
  }

  /*
   * 取得權限 
   */
  getAllPermission() {
    const userToPermissionTable = this.fireStoreService.fireStoreTabelNameList.UserToPermission;
    return this.fireStoreService.getAll(userToPermissionTable);
  }

}
