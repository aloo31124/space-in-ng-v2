import { TestBed } from '@angular/core/testing';

import { RouteUrlRecordService } from './route-url-record.service';

describe('RouteUrlRecordService', () => {
  let service: RouteUrlRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteUrlRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
