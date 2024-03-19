import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBasicComponent } from './loading-basic.component';

describe('LoadingBasicComponent', () => {
  let component: LoadingBasicComponent;
  let fixture: ComponentFixture<LoadingBasicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingBasicComponent]
    });
    fixture = TestBed.createComponent(LoadingBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
