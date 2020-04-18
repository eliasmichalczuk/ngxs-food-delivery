import { Place } from 'src/app/entities/place';
export class SetPlace {
  static readonly type = '[hello.component] SetPlace';
  constructor(public paylod: Place) {}
}

export class SetTest {
  static readonly type = '[hello.component] SetTest';
  constructor(public payload: string) {}
}
