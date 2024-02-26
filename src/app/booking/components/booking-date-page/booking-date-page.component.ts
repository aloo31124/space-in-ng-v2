import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';


@Component({
  selector: 'app-booking-date-page',
  templateUrl: './booking-date-page.component.html',
  styleUrls: ['./booking-date-page.component.scss']
})
export class BookingDatePageComponent {

  currentYear = 0;
  currentMonth = 0;
  selectDateInfo = "";
  
  
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void { }

  /* 
   * 下一步
   */
  nextStep() {
    alert("選擇日期為: " + this.selectDateInfo);
    // 建立 NavigationExtras 對象
    const navigationExtras: NavigationExtras = {
      queryParams: {
        selectDate: this.selectDateInfo
      }
    };
    
    this.router.navigate(["booking-clock"], navigationExtras);
  }

  /*
   * 更新日期元件 之 日期資訊 
   */
  updateSelectDay(selectDay: string) {
    this.selectDateInfo = selectDay;
  }


}
