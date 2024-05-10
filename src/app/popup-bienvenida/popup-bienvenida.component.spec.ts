import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupBienvenidaComponent } from './popup-bienvenida.component';

describe('PopupBienvenidaComponent', () => {
  let component: PopupBienvenidaComponent;
  let fixture: ComponentFixture<PopupBienvenidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupBienvenidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupBienvenidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
