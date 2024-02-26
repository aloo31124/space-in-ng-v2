import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCheckFormPageComponent } from './booking-check-form-page.component';

describe('BookingCheckFormPageComponent', () => {
  let component: BookingCheckFormPageComponent;
  let fixture: ComponentFixture<BookingCheckFormPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingCheckFormPageComponent]
    });
    fixture = TestBed.createComponent(BookingCheckFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
