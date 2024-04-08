import { Injectable } from '@angular/core';
import { FireStoreService } from 'src/app/firebase-api/services/fire-store.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // 使用者表 名稱
  UserTableName = this.fireStoreService.fireStoreTabelNameList.User;

  constructor(
    private fireStoreService: FireStoreService,
  ) { }

  /*
   * 新增一位使用者 
   */
  addUser(user: any):Promise<any> {
    return this.fireStoreService.post(this.UserTableName, user);
  }

  /*
   * 取得使用者, 依照 信件 email 
   */
  getUserIdByMail(mail: string) {
    return this.fireStoreService.getDataByField(this.UserTableName, "email", mail);
  }
  
}
