import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { FireStoreService } from 'src/app/firebase-api/services/fire-store.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

    
  // booking 預約 資料表名稱
  private bookingTable = this.fireStoreService.fireStoreTabelNameList.Booking;
  // 本次預約流程之 選擇日期
  private selectDateInfo = "";
  // 本次預約流程之 開始時間
  startTime = "09:00";
  // 本次預約流程之 結束時間
  endTime = "09:00";
  // 本次預約流程中 選擇日期 之前 已經存在之預約記錄
  selectDayAllBookingRecordList: Booking[] =[];

  constructor(
    private fireStoreService: FireStoreService,
  ) { }

  /* 
   * 取得 本次預約流程之 選擇日期
   */
  getSelectDate() {
    return this.selectDateInfo;
  }

  /* 
   * 設定 本次預約流程之 選擇日期
   */
  setSelectDate(selectDate: string) {
    this.selectDateInfo = selectDate;
  }

  /* 
   * 取得 本次預約流程之 開始時間
   */
  getStartTime() {
    return this.startTime;
  }
  /* 
   * 設定 本次預約流程之 開始時間
   */
  setStartTime(startTime: string) {
    this.startTime = startTime;
  }

  /* 
   * 取得 本次預約流程之 結束時間
   */
  getEndTime() {
    return this.endTime;
  }

  /* 
   * 設定 本次預約流程之 結束時間
   */
  setEndTime(endTime: string) {
    this.endTime = endTime;
  }

  /*
   *  取得 本次預約流程中 選擇日期 之前 已經存在之預約記錄
   */
  getThisDayAllBookingRecord() {
    return this.selectDayAllBookingRecordList;
  }

  /*
   *  設定 本次預約流程中 選擇日期 之前 已經存在之預約記錄
   */
  setThisDayAllBookingRecord(list: Booking[]) {
    this.selectDayAllBookingRecordList = [];
    this.selectDayAllBookingRecordList = list;
  }

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
