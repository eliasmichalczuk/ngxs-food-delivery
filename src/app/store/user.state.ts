import { UserRegistered } from './user.actions';
import { StateToken, State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';

export interface UserStateModel {
  name: string;
  email: string;
  phone: string;
}

const USER_STATE_TOKEN = new StateToken<UserStateModel>('user');
@State<UserStateModel>({
  name: USER_STATE_TOKEN,
  defaults: undefined
})
@Injectable()
export class UserState {

  @Action(UserRegistered)
  setPlace(ctx: StateContext<UserStateModel>, { payload }: UserRegistered) {
    ctx.setState({
      email: payload.email,
      name: payload.name,
      phone: payload.phone
    });
  }
}
