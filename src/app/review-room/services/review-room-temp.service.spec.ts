import { TestBed } from '@angular/core/testing';

import { ReviewRoomTempService } from './review-room-temp.service';

describe('ReviewRoomTempService', () => {
  let service: ReviewRoomTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewRoomTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
