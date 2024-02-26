import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockPickerComponent } from './clock-picker.component';

describe('ClockPickerComponent', () => {
  let component: ClockPickerComponent;
  let fixture: ComponentFixture<ClockPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClockPickerComponent]
    });
    fixture = TestBed.createComponent(ClockPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
