import { Action, State, StateContext, StateToken } from '@ngxs/store';

import { Place } from '../entities/place';
import { SetPlace } from './app.actions';

export interface AppStateModel {
  user: {
    name: string,
    email: string,
    phone: string
  };
  order: {
    id: string,
    status: 'PENDING' | 'CONFIRMED' | 'DECLINED'
  };
  place: Place;
}

const APP_STATE_TOKEN = new StateToken<AppStateModel>('app');
@State<AppStateModel>({
  name: APP_STATE_TOKEN,
  defaults: {
    user: {
      name: '',
      email: '',
      phone: ''
    },
    order: {
      id: Math.floor(Math.random() * 20000).toString(),
      status: 'PENDING'
    },
    place: {
      city: '',
      country: '',
      id: ''
    }
  }
})
export class AppState {

  @Action(SetPlace) setPlace(ctx: StateContext<AppStateModel>, payload: Place) {
    const state = ctx.getState();
    ctx.patchState({
      place: payload
    });
  }
}
// place: {
//   city: payload.city,
//   country: payload.country,
//   id: payload.id
// }