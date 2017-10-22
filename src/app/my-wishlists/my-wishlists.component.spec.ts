import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWishlistsComponent } from './my-wishlists.component';

describe('MyWishlistsComponent', () => {
  let component: MyWishlistsComponent;
  let fixture: ComponentFixture<MyWishlistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWishlistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWishlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
