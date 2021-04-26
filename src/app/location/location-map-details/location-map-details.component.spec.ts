import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMapDetailsComponent } from './location-map-details.component';

describe('LocationMapDetailsComponent', () => {
  let component: LocationMapDetailsComponent;
  let fixture: ComponentFixture<LocationMapDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationMapDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationMapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
