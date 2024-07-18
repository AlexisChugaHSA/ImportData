import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRecuperarPasswordComponent } from './popup-recuperar-password.component';

describe('PopupRecuperarPasswordComponent', () => {
  let component: PopupRecuperarPasswordComponent;
  let fixture: ComponentFixture<PopupRecuperarPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupRecuperarPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupRecuperarPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
