import { TestBed } from '@angular/core/testing';

import { GetAllRestaurantService } from './get-all-restaurant.service';

xdescribe('GetAllRestaurantsService', () => {
  let service: GetAllRestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllRestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
