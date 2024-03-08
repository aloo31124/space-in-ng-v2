import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { 
  Firestore,
  collection,
  collectionData,
  addDoc
} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private firestore: Firestore,
  ) { }

  /* 
   * 取得所有 booking 資料
   */
  getAll() {
    const collectionInstance = collection(this.firestore, 'Booking');
    return collectionData(collectionInstance);
  }

  /* 
   * 新增一筆 booking 資料
   */
  post(booking: Booking):Promise<any> {
    const collectionInstance = collection(this.firestore, 'Booking');
    return addDoc(collectionInstance, booking);
  }

}
