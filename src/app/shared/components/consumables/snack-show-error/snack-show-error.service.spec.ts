import { TestBed } from '@angular/core/testing';

import { SnackShowErrorService } from './snack-show-error.service';

describe('SnackShowErrorService', () => {
  let service: SnackShowErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackShowErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
