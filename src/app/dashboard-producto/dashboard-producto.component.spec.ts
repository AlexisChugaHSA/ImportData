import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductoComponent } from './dashboard-producto.component';

describe('DashboardProductoComponent', () => {
  let component: DashboardProductoComponent;
  let fixture: ComponentFixture<DashboardProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
