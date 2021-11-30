import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteAdvertsComponent } from './favourite-adverts.component';

describe('FavouriteAdvertsComponent', () => {
  let component: FavouriteAdvertsComponent;
  let fixture: ComponentFixture<FavouriteAdvertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteAdvertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteAdvertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
