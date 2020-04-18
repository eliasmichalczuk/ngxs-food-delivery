import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumProfileCardComponent } from './medium-profile-card.component';

describe('MediumProfileCardComponent', () => {
  let component: MediumProfileCardComponent;
  let fixture: ComponentFixture<MediumProfileCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumProfileCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
