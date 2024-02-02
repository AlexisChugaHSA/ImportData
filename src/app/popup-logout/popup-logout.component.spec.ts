import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupLogoutComponent } from './popup-logout.component';

describe('PopupLogoutComponent', () => {
  let component: PopupLogoutComponent;
  let fixture: ComponentFixture<PopupLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupLogoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
