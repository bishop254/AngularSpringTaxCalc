import { TestBed } from '@angular/core/testing';

import { BillServService } from './bill-serv.service';

describe('BillServService', () => {
  let service: BillServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
