import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupErrorPagoComponent } from './popup-error-pago.component';

describe('PopupErrorPagoComponent', () => {
  let component: PopupErrorPagoComponent;
  let fixture: ComponentFixture<PopupErrorPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupErrorPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupErrorPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
