import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidPlanListComponent } from './paid-plan-list.component';

describe('PaidPlanListComponent', () => {
  let component: PaidPlanListComponent;
  let fixture: ComponentFixture<PaidPlanListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaidPlanListComponent]
    });
    fixture = TestBed.createComponent(PaidPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
