import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedAdvertsComponent } from './featured-adverts.component';

describe('FeaturedAdvertsComponent', () => {
  let component: FeaturedAdvertsComponent;
  let fixture: ComponentFixture<FeaturedAdvertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedAdvertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedAdvertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
