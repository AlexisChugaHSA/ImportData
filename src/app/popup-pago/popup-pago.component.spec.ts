import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPagoComponent } from './popup-pago.component';

describe('PopupPagoComponent', () => {
  let component: PopupPagoComponent;
  let fixture: ComponentFixture<PopupPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
