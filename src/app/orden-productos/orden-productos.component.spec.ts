import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenProductosComponent } from './orden-productos.component';

describe('OrdenProductosComponent', () => {
  let component: OrdenProductosComponent;
  let fixture: ComponentFixture<OrdenProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
