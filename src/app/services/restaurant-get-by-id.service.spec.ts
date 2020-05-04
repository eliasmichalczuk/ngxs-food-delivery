import { TestBed } from '@angular/core/testing';

import { RestaurantGetByIdService } from './restaurant-get-by-id.service';

describe('RestaurantGetByIdService', () => {
  let service: RestaurantGetByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantGetByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
