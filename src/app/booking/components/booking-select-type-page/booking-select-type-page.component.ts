import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-booking-select-type-page',
  templateUrl: './booking-select-type-page.component.html',
  styleUrls: ['./booking-select-type-page.component.scss']
})
export class BookingSelectTypePageComponent {

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {}

  selectForm(bookingType: string) {
    
    const navigationExtras: NavigationExtras = {
      queryParams: {
        bookingType: bookingType
      }
    };

    this.router.navigate(["booking-check-form"], navigationExtras);
  }

}
