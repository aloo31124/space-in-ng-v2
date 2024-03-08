import { Injectable } from '@angular/core';
import { 
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReviewBookingService {

  constructor(
    private firestore: Firestore,
  ) { }

  /* 
   * 使用 userId找該員之紀錄 
   */
  getAllBookingDayByUserId() {
    const collectionInstance = collection(this.firestore, 'Booking');
    return collectionData(
        collectionInstance, 
        {idField: 'fireStoreId'}  // fireStoreId
    )
  }

}
