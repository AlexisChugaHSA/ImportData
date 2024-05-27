import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCargandoComponent } from './popup-cargando.component';

describe('PopupCargandoComponent', () => {
  let component: PopupCargandoComponent;
  let fixture: ComponentFixture<PopupCargandoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCargandoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCargandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
