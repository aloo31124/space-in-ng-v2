import { Injectable } from '@angular/core';
import { 
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  // 資料庫表名稱
  fireStoreTabelNameList = { 
    // 使用者資訊
    User: "User", 
    // 該使用者 購買 之 方案
    UserToPayment: "UserToPayment",
    // 該使用者擁有權限
    UserToPermission: "UserToPermission",
    // 預約資訊表
    Booking: "Booking",
    // 教室表
    Room: "Room",
    // 座位表
    RoomToSite: "RoomToSite",
    // 購買方案表
    Payment: "Payment",
  };

  constructor(
    private firestore: Firestore,
  ) { }

  /*
   * 取得該資料表所有資料 
   */
  getAll(tableName:string) {
    const collectionInstance = collection(this.firestore, tableName);
    return collectionData(
        collectionInstance, 
        {idField: 'fireStoreId'} // 取得該 fireStoreId , 方便後續刪除 或 查詢
      );
  }

  /*
   * 藉由 欄位名稱取得資料 
   */
  getDataByField(tableName: string, fieldName: string, fieldValue: string):Promise<any> {
    const q = query(collection(this.firestore, tableName), where(fieldName, "==", fieldValue));
    return getDocs(q);
  }

  /* 
   * 新增一筆 資料
   */
  post(tableName:string, newData:any):Promise<any> {
    const collectionInstance = collection(this.firestore, tableName);
    return addDoc(collectionInstance, newData);
  }

  /*
   * 依照 id 刪除資料 
   */
  deleteById(tableName:string, id:string) {
    const docInstance = doc(this.firestore, tableName, id);
    deleteDoc(docInstance);
  }

}

