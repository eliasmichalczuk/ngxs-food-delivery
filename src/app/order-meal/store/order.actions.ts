import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';

import { Restaurant } from './../../entities/restaurant';
import { SetRestaurant, AddItemToBag, RemoveItemFromBag } from './order.state';

export interface OngoingOrderModel {
  restaurant: {
    id: string;
    name: string;
    address: {
      street: string;
      number: string;
      neighborhood: string;
      city: string;
    };
    style: string;
    image: string;
    rating: number;
  };
  dishes: {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    quantity: number;
    bagId: number;
  }[];
}

const APP_STATE_TOKEN = new StateToken<OngoingOrderModel>('ongoingOrder');
@State<OngoingOrderModel>({
  name: APP_STATE_TOKEN,
  defaults: {
    dishes: [],
    restaurant: {
      id: '',
      name: '',
      style: '',
      image: '',
      rating: 0,
      address: {
        street: '',
        number: '',
        neighborhood: '',
        city: ''
      }
    }
  }
})
@Injectable()
export class OngoingOrder {
  @Action(SetRestaurant) SetRestaurant(ctx: StateContext<OngoingOrderModel>, { payload }: SetRestaurant) {
    ctx.setState({
      ...ctx.getState(),
      restaurant: {
        ...payload
      }
    });
  }

  @Action(AddItemToBag) AddItemToBag(ctx: StateContext<OngoingOrderModel>, { payload }: AddItemToBag) {
    const i = payload;
    ctx.setState({
      ...ctx.getState(),
      dishes: [
        ...ctx.getState().dishes,
        {id: i.id, name: i.name, description: i.description,
          price: i.price, currency: i.currency, quantity: i.quantity,
          bagId: Math.random()}
      ]
    });
  }

  @Action(RemoveItemFromBag) RemoveItemFromBag(ctx: StateContext<OngoingOrderModel>, { payload }: AddItemToBag) {
    const items = ctx.getState().dishes;
    items.splice(
    // tslint:disable-next-line:no-string-literal
      items.findIndex(item => item.id === payload.id && item.bagId === payload['bagId']), 1);
    ctx.setState({
      ...ctx.getState(),
      dishes: [
        ...items
      ]
    });
  }
}
