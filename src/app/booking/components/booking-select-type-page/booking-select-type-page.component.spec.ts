import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSelectTypePageComponent } from './booking-select-type-page.component';

describe('BookingSelectTypePageComponent', () => {
  let component: BookingSelectTypePageComponent;
  let fixture: ComponentFixture<BookingSelectTypePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingSelectTypePageComponent]
    });
    fixture = TestBed.createComponent(BookingSelectTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
