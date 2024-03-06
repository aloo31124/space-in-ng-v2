import { TestBed } from '@angular/core/testing';

import { ReviewBookingService } from './review-booking.service';

describe('ReviewBookingService', () => {
  let service: ReviewBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
