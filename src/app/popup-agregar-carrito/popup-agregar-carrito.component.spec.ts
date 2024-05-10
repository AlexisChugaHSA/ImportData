import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAgregarCarritoComponent } from './popup-agregar-carrito.component';

describe('PopupAgregarCarritoComponent', () => {
  let component: PopupAgregarCarritoComponent;
  let fixture: ComponentFixture<PopupAgregarCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAgregarCarritoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAgregarCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
