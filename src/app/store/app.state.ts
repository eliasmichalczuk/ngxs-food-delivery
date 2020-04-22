import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { SetPlace, SetTest } from './app.actions';
import { Injectable } from '@angular/core';

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
    id: number,
    status: 'PENDING' | 'CONFIRMED' | 'DECLINED' | 'NONE'
  };
  place: {
    city: string;
    country: string;
    id: string;
  };
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
      id: 0,
      status: 'NONE'
    },
    place: {
      city: '',
      country: '',
      id: ''
    }
  },
})
@Injectable()
export class AppState {

  @Action(SetPlace) setPlace(ctx: StateContext<AppStateModel>, { payload }: SetPlace) {
    ctx.setState({
      ...ctx.getState(),
      place: {
        city: payload.city,
        country: payload.country,
        id: payload.id
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
