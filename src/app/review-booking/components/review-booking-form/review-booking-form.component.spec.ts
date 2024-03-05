import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBookingFormComponent } from './review-booking-form.component';

describe('ReviewBookingFormComponent', () => {
  let component: ReviewBookingFormComponent;
  let fixture: ComponentFixture<ReviewBookingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewBookingFormComponent]
    });
    fixture = TestBed.createComponent(ReviewBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
