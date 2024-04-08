import { Injectable } from '@angular/core';
import { FireStoreService } from 'src/app/firebase-api/services/fire-store.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  UserTableName = this.fireStoreService.fireStoreTabelNameList.User;

  constructor(
    private fireStoreService: FireStoreService,
  ) { }

  getUserIdByMail(mail: string) {
    return this.fireStoreService.getDataByField(this.UserTableName, "email", mail);
  }
  
}
