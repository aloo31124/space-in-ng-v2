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
  selectTime = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 提取日期参数
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectDate = params['selectDate'];
      this.selectTime = params['selectTime'];
    });
  }

  selectForm(bookingType: string) {
    
    const navigationExtras: NavigationExtras = {
      queryParams: {
        selectDate: this.selectDate,
        selectTime: this.selectTime,
        bookingType: bookingType
      }
    };

    this.router.navigate(["booking-check-form"], navigationExtras);
  }

}
