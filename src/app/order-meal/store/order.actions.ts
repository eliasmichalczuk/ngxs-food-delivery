import { AppStateModel } from './../../store/app.state';
import { CompleteOrderService } from './../services/complete-order.service';
import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken, Store, Selector } from '@ngxs/store';

import { Restaurant } from './../../entities/restaurant';
import { SetRestaurant, AddItemToBag, ConfirmOrder, OrderSuccess, OrderFailed, RemoveItemFromBag, OrderPending } from './order.state';
import { CompleteOrderDto } from 'src/app/entities/complete-order';
import { tap, catchError, map } from 'rxjs/operators';
import { SnackShowErrorService } from 'src/app/shared/components/consumables/snack-show-error/snack-show-error.service';

export interface OngoingOrderModel {
  id: number;
  status: 'PENDING' | 'SUCCESS' | 'DECLINED' | 'NONE';
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
    private store: Store,
    private handler: SnackShowErrorService
  ) { }

  @Selector()
  static status(state: OngoingOrderModel): string {
    return state.status;
  }

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
      items.findIndex(item => item.id === payload.id && item.bagId === payload.bagId), 1);
    ctx.setState({
      ...ctx.getState(),
      dishes: [
        ...items
      ]
    });
  }

  @Action(ConfirmOrder) ConfirmOrder(ctx: StateContext<OngoingOrderModel>) {
    ctx.patchState({status: 'PENDING'});
    const state = ctx.getState();
    const dishes = state.dishes;
    const orderId = state.id;
    const userId = this.store.selectSnapshot<any>(global => global.app.user.name);
    ctx.dispatch([new OrderPending(state.id)]);
    this.confirmOrderService.post(new CompleteOrderDto(userId, dishes as any))
      .subscribe(e => ctx.dispatch(new OrderSuccess(orderId)),
        err => {
          this.handler.error(err);
          return ctx.dispatch(new OrderFailed(orderId));
        });
  }

  @Action(OrderSuccess) OrderSuccess({ patchState }: StateContext<OngoingOrderModel>) {
    patchState({status: 'SUCCESS'});
  }

  @Action(OrderFailed) OrderDeclined({ patchState }: StateContext<OngoingOrderModel>) {
    patchState({status: 'DECLINED'});
  }
}
