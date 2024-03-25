import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRoomTrendComponent } from './review-room-trend.component';

describe('ReviewRoomTrendComponent', () => {
  let component: ReviewRoomTrendComponent;
  let fixture: ComponentFixture<ReviewRoomTrendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewRoomTrendComponent]
    });
    fixture = TestBed.createComponent(ReviewRoomTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
