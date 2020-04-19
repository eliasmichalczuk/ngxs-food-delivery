import { Restaurant } from 'src/app/entities/restaurant';

export class SetRestaurant {
  static readonly type = '[order-meal.component] SetRestaurant';
  constructor(public payload: Restaurant) { }
}
