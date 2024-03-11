import { TestBed } from '@angular/core/testing';

import { RoomSiteService } from './room-site.service';

describe('RoomSiteService', () => {
  let service: RoomSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
