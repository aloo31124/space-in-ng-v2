import { Component } from '@angular/core';
import { ReviewType } from '../../models/review-type.model';

@Component({
  selector: 'app-review-room-overview',
  templateUrl: './review-room-overview.component.html',
  styleUrls: ['./review-room-overview.component.scss']
})
export class ReviewRoomOverviewComponent {

  // 選擇 總攬種類模型
  reviewType = new ReviewType();

  // 當前選擇 總攬種類
  selectReviewType = this.reviewType.BOOKING_TREND;

  /*
   * 點選 總攬種類 
   */
  changeReviewType(selectType: string){
    this.selectReviewType = selectType;
  }

}
