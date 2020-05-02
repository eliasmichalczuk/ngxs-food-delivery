import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishFromAnotherRestaurantHandlerComponent } from './dish-from-another-restaurant-handler.component';

describe('DishFromAnotherRestaurantHandlerComponent', () => {
  let component: DishFromAnotherRestaurantHandlerComponent;
  let fixture: ComponentFixture<DishFromAnotherRestaurantHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishFromAnotherRestaurantHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishFromAnotherRestaurantHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
