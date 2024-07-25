import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupErrorNewUsuarioComponent } from './popup-error-new-usuario.component';

describe('PopupErrorNewUsuarioComponent', () => {
  let component: PopupErrorNewUsuarioComponent;
  let fixture: ComponentFixture<PopupErrorNewUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupErrorNewUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupErrorNewUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
