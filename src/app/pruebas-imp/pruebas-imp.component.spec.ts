import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasImpComponent } from './pruebas-imp.component';

describe('PruebasImpComponent', () => {
  let component: PruebasImpComponent;
  let fixture: ComponentFixture<PruebasImpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebasImpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebasImpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
