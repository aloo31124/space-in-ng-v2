import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-select-type-page',
  templateUrl: './booking-select-type-page.component.html',
  styleUrls: ['./booking-select-type-page.component.scss']
})
export class BookingSelectTypePageComponent {

  selectDate = "";
  startTime = "";
  endTime = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 提取日期参数
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectDate = params['selectDate'];
      this.startTime = params['startTime'];
      this.endTime = params['endTime'];
    });
  }

  selectForm(bookingType: string) {
    
    const navigationExtras: NavigationExtras = {
      queryParams: {
        selectDate: this.selectDate,
        startTime: this.startTime,
        endTime: this.endTime,
        bookingType: bookingType
      }
    };

    this.router.navigate(["booking-check-form"], navigationExtras);
  }

}
