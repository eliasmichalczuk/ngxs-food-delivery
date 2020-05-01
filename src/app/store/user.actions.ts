import { User } from './../entities/user';
import { Place } from 'src/app/entities/place';

export class UserRegistered {
  static readonly type = '[create-account-modal.component] UserRegisted';
  constructor(public payload: User) { }
}
