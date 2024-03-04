import { TestBed } from '@angular/core/testing';

import { ReviewRoomService } from './review-room.service';

describe('ReviewRoomService', () => {
  let service: ReviewRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
