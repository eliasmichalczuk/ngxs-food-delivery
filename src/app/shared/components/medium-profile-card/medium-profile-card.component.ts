import { Store } from '@ngxs/store';
import { Restaurant } from './../../../entities/restaurant';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-medium-profile-card',
  templateUrl: './medium-profile-card.component.html',
  styleUrls: ['./medium-profile-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediumProfileCardComponent implements OnInit {

  @Input() restaurant: Restaurant;
  @Input() selected: boolean;
  constructor(
  ) { }

  ngOnInit(): void {
  }

  espetacularRating() {
    return this.restaurant.rating > 4.5;
  }
}
