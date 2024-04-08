import { Injectable } from '@angular/core';
import { 
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  // 資料庫表名稱
  fireStoreTabelNameList = { 
    User: "User", 
    Booking: "Booking",
    Room: "Room",
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
  getDataByField(tableName: string, fieldName: string) {
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

