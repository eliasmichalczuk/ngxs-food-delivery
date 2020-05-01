import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';

import { OrderDeclined, OrderPending, OrderSuccess } from '../order-meal/store/ongoing-order.actions';
import { SetPlace } from './app.actions';

export interface AppStateModel {
  lastOrder: {
    id: number,
    status: 'PENDING' | 'SUCCESS' | 'DECLINED' | 'NONE'
  };
  place: {
    city: string;
    country: string;
    id: string;
  };
  userForm: {
    model: any,
    dirty: boolean,
    status: '',
    errors: {}
  };
}

const APP_STATE_TOKEN = new StateToken<AppStateModel>('app');
@State<AppStateModel>({
  name: APP_STATE_TOKEN,
  defaults: {
    lastOrder: {
      id: 0,
      status: 'NONE'
    },
    place: {
      city: '',
      country: '',
      id: ''
    },
    userForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
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
  }
}
