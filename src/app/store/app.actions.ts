import { Restaurant } from './../entities/restaurant';
import { Place } from 'src/app/entities/place';
export class SetPlace {
  static readonly type = '[hello.component] SetPlace';
  constructor(public payload: Place) {}
}


export class SetTest {
  static readonly type = '[hello.component] SetTest';
  constructor(public payload: string) {}
}
