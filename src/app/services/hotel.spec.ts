import { TestBed } from '@angular/core/testing';
import { hotelService } from './hotel';

describe('hotel', () => {
  let service: hotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(hotelService as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
