import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumDishCardComponent } from './medium-dish-card.component';

describe('MediumDishCardComponent', () => {
  let component: MediumDishCardComponent;
  let fixture: ComponentFixture<MediumDishCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumDishCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumDishCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
