import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPricingComponent } from './dashboard-pricing.component';

describe('DashboardPricingComponent', () => {
  let component: DashboardPricingComponent;
  let fixture: ComponentFixture<DashboardPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPricingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
