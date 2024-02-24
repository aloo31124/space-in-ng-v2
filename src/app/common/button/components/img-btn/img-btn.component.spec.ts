import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgBtnComponent } from './img-btn.component';

describe('ImgBtnComponent', () => {
  let component: ImgBtnComponent;
  let fixture: ComponentFixture<ImgBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImgBtnComponent]
    });
    fixture = TestBed.createComponent(ImgBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
