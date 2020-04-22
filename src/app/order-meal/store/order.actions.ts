import { AppStateModel } from './../../store/app.state';
import { CompleteOrderService } from './../services/complete-order.service';
import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';

import { Restaurant } from './../../entities/restaurant';
import { SetRestaurant, AddItemToBag, ConfirmOrder, OrderSuccess, OrderFailed, RemoveItemFromBag } from './order.state';
import { CompleteOrderDto } from 'src/app/entities/complete-order';
import { tap } from 'rxjs/operators';

export interface OngoingOrderModel {
  id: number;
  status: 'PENDING' | 'CONFIRMED' | 'DECLINED' | 'NONE';
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
    id: Math.floor(Math.random() * 20000),
    status: 'NONE',
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

  constructor(
    private confirmOrderService: CompleteOrderService,
    private store: Store
  ) { }

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

  @Action(ConfirmOrder) ConfirmOrder({ dispatch, patchState }: StateContext<OngoingOrderModel>) {
    patchState({status: 'PENDING'});
    const dishes = this.store.selectSnapshot<any>((state: OngoingOrderModel) => state.dishes);
    const orderId = this.store.selectSnapshot<any>((state: OngoingOrderModel) => state.id);
    const userId = this.store.selectSnapshot<any>(state => state.app.user.name);
    return this.confirmOrderService.post(new CompleteOrderDto(userId, dishes as any))
      .pipe(tap(success => (success ? dispatch(new OrderSuccess(orderId)) : dispatch(new OrderFailed(orderId)))));
  }
}
