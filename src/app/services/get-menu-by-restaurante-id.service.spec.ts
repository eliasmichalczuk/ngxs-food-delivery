import { TestBed } from '@angular/core/testing';

import { GetMenuByRestauranteIdService } from './get-menu-by-restaurante-id.service';

xdescribe('GetMenuByRestauranteIdService', () => {
  let service: GetMenuByRestauranteIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMenuByRestauranteIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
