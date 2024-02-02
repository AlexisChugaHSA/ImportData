import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCancelarPagoComponent } from './popup-cancelar-pago.component';

describe('PopupCancelarPagoComponent', () => {
  let component: PopupCancelarPagoComponent;
  let fixture: ComponentFixture<PopupCancelarPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCancelarPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCancelarPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
