import { Action, State, StateContext, StateToken } from '@ngxs/store';

import { Place } from '../entities/place';
import { SetPlace, SetTest } from './app.actions';
import { Injectable } from '@angular/core';
import { state } from '@angular/animations';

// export interface PlaceStateModel {
//   city: string;
//   country: string;
//   id: string;
// }

// const PLACE_STATE_TOKEN = new StateToken<PlaceStateModel>('place');
// @State<PlaceStateModel>({
//   name: PLACE_STATE_TOKEN,
//   defaults: {
//     city: '',
//     country: '',
//     id: ''
//   }
// })
// @Injectable()
// export class PlaceState {

//   @Action(SetPlace) setPlace(ctx: StateContext<PlaceStateModel>, payload: Place) {
//     ctx.setState({
//       city: payload.city,
//       country: payload.country,
//       id: payload.id
//     });
//   }
// }
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
  // place: Place;
  place: {
    city: string;
    country: string;
    id: string;
  };
  test: string;
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
    test: '',
    place: {
      city: '',
      country: '',
      id: ''
    }
  },
})
@Injectable()
export class AppState {
  @Action(SetTest) setTest({ patchState }: StateContext<AppStateModel>, { payload }: SetTest) {
    patchState({ test: payload });
  }

  @Action(SetPlace) setPlace(ctx: StateContext<AppStateModel>, payload: SetPlace) {
    ctx.setState({
      ...ctx.getState(),
      place: {
        city: payload.payload.city,
        country: payload.payload.country,
        id: payload.payload.id
      }
    });
  }
}
// place: {
//   city: payload.city,
//   country: payload.country,
//   id: payload.id
// }


// ctx.setState(
//   patch({
//     place: patch({
//       city: payload.city,
//       country: payload.country,
//       id: payload.id,
//     })
//   })
// );
