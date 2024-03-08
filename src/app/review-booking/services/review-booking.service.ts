import { Injectable } from '@angular/core';
import { FireStoreService } from 'src/app/firebase-api/services/fire-store.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewBookingService {

  bookingTableName = this.fireStoreService.fireStoreTabelNameList.Booking;

  constructor(
    private fireStoreService: FireStoreService,
  ) { }

  /* 
   * 使用 fireStoreId 找該員之紀錄 
   */
  getAllBookingDayByUserId() {
    return this.fireStoreService.getAll(this.bookingTableName);
  }

  /*
   * 使用 fireStoreId ,取消(刪除) 預約booking 紀錄
   */
  deleteBookingById(fireStoreId: string) {
    this.fireStoreService.deleteById(this.bookingTableName, fireStoreId);
  }

}
