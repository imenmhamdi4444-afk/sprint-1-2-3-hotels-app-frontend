import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hotelGuard } from './hotel-guard';

describe('hotelGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hotelGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
