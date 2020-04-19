import { TestBed } from '@angular/core/testing';

import { GetAllRestaurantService } from './get-all-restaurant.service';

describe('GetAllRestaurantsService', () => {
  let service: GetAllRestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllRestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
