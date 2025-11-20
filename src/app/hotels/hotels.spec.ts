import { ComponentFixture, TestBed } from '@angular/core/testing';

import { hotels } from './hotels';

describe('hotels', () => {
  let component: hotels;
  let fixture: ComponentFixture<hotels>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [hotels]
    })
    .compileComponents();

    fixture = TestBed.createComponent(hotels);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
