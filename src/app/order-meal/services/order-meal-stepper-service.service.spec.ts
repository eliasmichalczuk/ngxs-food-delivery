import { TestBed } from '@angular/core/testing';

import { OrderMealStepperServiceService } from './order-meal-stepper-service.service';

describe('OrderMealStepperServiceService', () => {
  let service: OrderMealStepperServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderMealStepperServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
