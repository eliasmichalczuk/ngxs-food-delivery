import { TestBed } from '@angular/core/testing';

import { CompleteOrderService } from './complete-order.service';

describe('CompleteOrderService', () => {
  let service: CompleteOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompleteOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
