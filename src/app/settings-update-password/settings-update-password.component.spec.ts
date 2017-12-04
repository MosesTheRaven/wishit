import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsUpdatePasswordComponent } from './settings-update-password.component';

describe('SettingsUpdatePasswordComponent', () => {
  let component: SettingsUpdatePasswordComponent;
  let fixture: ComponentFixture<SettingsUpdatePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsUpdatePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsUpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
