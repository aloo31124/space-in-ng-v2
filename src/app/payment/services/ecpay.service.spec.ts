import { TestBed } from '@angular/core/testing';

import { EcpayService } from './ecpay.service';

describe('EcpayService', () => {
  let service: EcpayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcpayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
