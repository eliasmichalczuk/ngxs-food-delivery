import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishDetailsModalComponent } from './dish-details-modal.component';

describe('DishDetailsModalComponent', () => {
  let component: DishDetailsModalComponent;
  let fixture: ComponentFixture<DishDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
