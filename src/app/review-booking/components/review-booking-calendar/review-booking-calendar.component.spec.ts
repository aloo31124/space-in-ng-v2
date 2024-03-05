import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBookingCalendarComponent } from './review-booking-calendar.component';

describe('ReviewBookingCalendarComponent', () => {
  let component: ReviewBookingCalendarComponent;
  let fixture: ComponentFixture<ReviewBookingCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewBookingCalendarComponent]
    });
    fixture = TestBed.createComponent(ReviewBookingCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
