import { TestBed } from '@angular/core/testing';
import { HotelService } from './hotel';

describe('hotel', () => {
  let service: HotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelService as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
