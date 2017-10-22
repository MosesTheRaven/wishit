import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrihlasenieComponent } from './prihlasenie.component';

describe('PrihlasenieComponent', () => {
  let component: PrihlasenieComponent;
  let fixture: ComponentFixture<PrihlasenieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrihlasenieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrihlasenieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
