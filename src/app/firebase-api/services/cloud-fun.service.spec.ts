import { TestBed } from '@angular/core/testing';

import { CloudFunService } from './cloud-fun.service';

describe('CloudFunService', () => {
  let service: CloudFunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudFunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
