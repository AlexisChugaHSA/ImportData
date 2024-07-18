import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupContraseniaTemporalComponent } from './popup-contrasenia-temporal.component';

describe('PopupContraseniaTemporalComponent', () => {
  let component: PopupContraseniaTemporalComponent;
  let fixture: ComponentFixture<PopupContraseniaTemporalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupContraseniaTemporalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupContraseniaTemporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
