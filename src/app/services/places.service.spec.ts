import { TestBed } from '@angular/core/testing';

import { RandomPlaceService } from './places.service';

xdescribe('PlacesService', () => {
  let service: RandomPlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomPlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
