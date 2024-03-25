import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRoomRemanetRateComponent } from './review-room-remanet-rate.component';

describe('ReviewRoomRemanetRateComponent', () => {
  let component: ReviewRoomRemanetRateComponent;
  let fixture: ComponentFixture<ReviewRoomRemanetRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewRoomRemanetRateComponent]
    });
    fixture = TestBed.createComponent(ReviewRoomRemanetRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
