import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, Store, createSelector } from '@ngxs/store';
import { CompleteOrderDto } from 'src/app/entities/complete-order';
import { ItemOnBag } from 'src/app/order-meal/entities/item-on-bag';
import { SnackShowErrorService } from 'src/app/shared/components/consumables/snack-show-error/snack-show-error.service';

import { CompleteOrderService } from '../services/complete-order.service';
import {
  AddItemToBag,
  ConfirmOrder,
  EditItemOnBag,
  ItemOnBagEdited,
  OrderDeclined as OrderDeclined,
  OrderPending,
  OrderSuccess,
  RemoveItemFromBag,
  SetRestaurant,
} from './ongoing-order.actions';

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
    calledToBeEdited: boolean;
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
export class OngoingOrderState {

  constructor(
    private confirmOrderService: CompleteOrderService,
    private store: Store,
    private handler: SnackShowErrorService
  ) { }

  @Selector()
  static itemFromBagToEdit(state: OngoingOrderModel): ItemOnBag {
    const toEdit =  state.dishes.find(item => item.calledToBeEdited) as ItemOnBag;
    return toEdit;
  }

  @Selector()
  static status(state: OngoingOrderModel): string {
    return state.status;
  }

  // static dishesSubTotal() {
  //   return createSelector([OngoingOrderState], (state: OngoingOrderModel) => {
  //     return state.dishes.map(item => item.price * item.quantity)
  //       .reduce((itemTotal, nextItemTotal) => itemTotal + nextItemTotal, 0);
  //   });
  // }
  @Selector()
  static dishesSubTotal(state: OngoingOrderModel) {
    if (!state) {
      return 0;
    }
    return state.dishes.map(item => item.price * item.quantity)
      .reduce((itemTotal, nextItemTotal) => itemTotal + nextItemTotal, 0);
  }

  @Selector([OngoingOrderState.dishesSubTotal])
  static deliveryFee(subtotal: number) {
    return subtotal * 0.1 + 2000;
  }

  @Selector([OngoingOrderState.dishesSubTotal, OngoingOrderState.deliveryFee])
  static orderTotal(subtotal: number, deliveryFee: number) {
    return subtotal + deliveryFee;
  }

  @Action(SetRestaurant)
  SetRestaurant(ctx: StateContext<OngoingOrderModel>, { payload }: SetRestaurant) {
    ctx.setState({
      ...ctx.getState(),
      restaurant: {
        ...payload
      }
    });
  }

  @Action(AddItemToBag)
  AddItemToBag(ctx: StateContext<OngoingOrderModel>, { payload }: AddItemToBag) {
    const i = payload;
    ctx.setState({
      ...ctx.getState(),
      dishes: [
        ...ctx.getState().dishes,
        { id: i.id,
          name: i.name,
          description: i.description,
          price: i.price,
          currency: i.currency,
          quantity: i.quantity,
          calledToBeEdited: false,
          bagId: Math.random()
        }
      ]
    });
  }

  @Action(RemoveItemFromBag)
  RemoveItemFromBag(ctx: StateContext<OngoingOrderModel>, { payload }: RemoveItemFromBag) {
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

  @Action(EditItemOnBag)
  EditItemOnBag(ctx: StateContext<OngoingOrderModel>, { payload }: EditItemOnBag) {
    const items = ctx.getState().dishes;
    items[items.findIndex(item => item.id === payload.id && item.bagId === payload.bagId)].calledToBeEdited = true;
    ctx.patchState({dishes: [...items]});
  }

  @Action(ItemOnBagEdited)
  ItemOnBagEdited(ctx: StateContext<OngoingOrderModel>, edited: ItemOnBagEdited) {
    const dishes = ctx.getState().dishes;
    const itemToBeEditedIndex = dishes.findIndex(item => item.id === edited.itemId && item.bagId === edited.bagId);
    const removedItem = dishes.splice(itemToBeEditedIndex, 1)[0];
    removedItem.quantity = edited.quantity;
    removedItem.calledToBeEdited = false;
    const dishesAfterRemoveToEditItem = [...dishes];
    dishesAfterRemoveToEditItem.splice(itemToBeEditedIndex, 0, removedItem);
    ctx.setState({
      ...ctx.getState(),
      dishes: [
        ...dishesAfterRemoveToEditItem
      ]
    });
  }

  @Action(ConfirmOrder)
  ConfirmOrder(ctx: StateContext<OngoingOrderModel>) {
    ctx.patchState({status: 'PENDING'});
    const state = ctx.getState();
    const dishes = state.dishes;
    const orderId = state.id;
    const userId = this.store.selectSnapshot<any>(global => global.app.user.name);
    ctx.dispatch([new OrderPending(state.id)]);
    this.confirmOrderService.post(new CompleteOrderDto(userId, dishes as any))
      .subscribe(() => ctx.dispatch(new OrderSuccess(orderId)),
        err => {
          this.handler.error(err);
          return ctx.dispatch(new OrderDeclined(orderId));
        });
  }

  @Action(OrderSuccess)
  OrderSuccess({ patchState }: StateContext<OngoingOrderModel>) {
    patchState({status: 'SUCCESS'});
  }

  @Action(OrderDeclined)
  OrderDeclined({ patchState }: StateContext<OngoingOrderModel>) {
    patchState({status: 'DECLINED'});
  }
}
