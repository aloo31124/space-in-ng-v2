import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRoomOverviewComponent } from './review-room-overview.component';

describe('ReviewRoomOverviewComponent', () => {
  let component: ReviewRoomOverviewComponent;
  let fixture: ComponentFixture<ReviewRoomOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewRoomOverviewComponent]
    });
    fixture = TestBed.createComponent(ReviewRoomOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
