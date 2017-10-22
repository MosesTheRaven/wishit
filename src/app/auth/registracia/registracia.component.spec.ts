import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraciaComponent } from './registracia.component';

describe('RegistraciaComponent', () => {
  let component: RegistraciaComponent;
  let fixture: ComponentFixture<RegistraciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistraciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
