import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { FireStoreService } from 'src/app/firebase-api/services/fire-store.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingTable = this.fireStoreService.fireStoreTabelNameList.Booking;

  constructor(
    private fireStoreService: FireStoreService,
  ) { }

  /* 
   * 取得所有 booking 資料
   */
  getAll() {
    return this.fireStoreService.getAll(this.bookingTable);
  }

  /* 
   * 新增一筆 booking 資料
   */
  post(booking: Booking):Promise<any> {
    return this.fireStoreService.post(this.bookingTable, booking);
  }

}
