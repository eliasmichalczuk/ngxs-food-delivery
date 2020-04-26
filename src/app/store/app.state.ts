import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';

import { OrderDeclined, OrderPending, OrderSuccess } from '../order-meal/store/ongoing-order.state';
import { SetPlace } from './app.actions';

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
  lastOrder: {
    id: number,
    status: 'PENDING' | 'SUCCESS' | 'DECLINED' | 'NONE'
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
    lastOrder: {
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

  @Action(OrderPending) OrderPending(ctx: StateContext<AppStateModel>, { orderId }: OrderSuccess) {
    ctx.setState({
      ...ctx.getState(),
      lastOrder: {
        id: orderId,
        status: 'PENDING'
      }
    });
  }

  @Action(OrderSuccess) OrderSuccess(ctx: StateContext<AppStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      lastOrder: {
        id: state.lastOrder.id,
        status: 'SUCCESS'
      }
    });
  }

  @Action(OrderDeclined) OrderDeclined(ctx: StateContext<AppStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      lastOrder: {
        id: state.lastOrder.id,
        status: 'DECLINED'
      }
    });
    // patchState({lastOrder: {id: getState.}});
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
