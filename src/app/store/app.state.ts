import { OrderFailed, OrderPending } from './../order-meal/store/order.state';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { SetPlace, SetTest } from './app.actions';
import { Injectable } from '@angular/core';
import { OrderSuccess, AddItemToBag } from '../order-meal/store/order.state';
import { OngoingOrderModel } from '../order-meal/store/order.actions';

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

  @Action(OrderSuccess) OrderSuccess({ patchState }: StateContext<OngoingOrderModel>) {
    patchState({status: 'SUCCESS'});
  }

  @Action(OrderFailed) OrderDeclined({ patchState }: StateContext<OngoingOrderModel>) {
    patchState({status: 'DECLINED'});
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
