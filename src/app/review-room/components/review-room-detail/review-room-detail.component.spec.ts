import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRoomDetailComponent } from './review-room-detail.component';

describe('ReviewRoomDetailComponent', () => {
  let component: ReviewRoomDetailComponent;
  let fixture: ComponentFixture<ReviewRoomDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewRoomDetailComponent]
    });
    fixture = TestBed.createComponent(ReviewRoomDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
