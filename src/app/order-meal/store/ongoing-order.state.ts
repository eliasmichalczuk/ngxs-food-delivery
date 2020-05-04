import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Action, Selector, State, StateContext, StateToken, Store, ofAction, Actions, ofActionDispatched } from '@ngxs/store';
import { patch, removeItem, updateItem } from '@ngxs/store/operators';
import { delay, retryWhen, take, takeUntil } from 'rxjs/operators';
import { CompleteOrderDto } from 'src/app/entities/complete-order';
import { ItemOnBag } from 'src/app/order-meal/entities/item-on-bag';
import { RestaurantGetByIdService } from 'src/app/services/restaurant-get-by-id.service';
import { SnackShowErrorService } from 'src/app/shared/components/consumables/snack-show-error/snack-show-error.service';
import { UserStateModel } from 'src/app/store/user.state';

import { CompleteOrderService } from '../services/complete-order.service';
import {
  DishFromAnotherRestaurantHandlerComponent,
} from './../../shared/components/dish-from-another-restaurant-handler/dish-from-another-restaurant-handler.component';
import {
  AddItemToBag,
  ConfirmOrder,
  EditItemOnBag,
  EmptyBag,
  ItemOnBagEdited,
  OrderDeclined as OrderDeclined,
  OrderPending,
  OrderSuccess,
  RemoveItemFromBag,
  SetRestaurant,
  ViewRestaurant,
} from './ongoing-order.actions';

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  quantity: number;
  bagId: number;
  calledToBeEdited: boolean;
}
export interface RestaurantOnView {
  name: string;
  id: string;
}
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
  restaurantOnView: RestaurantOnView;
  dishes?: Dish[];
}

const APP_STATE_TOKEN = new StateToken<OngoingOrderModel>('ongoingOrder');
@State<OngoingOrderModel>({
  name: APP_STATE_TOKEN,
  defaults: {
    id: Math.floor(Math.random() * 20000),
    status: 'NONE',
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
    },
    restaurantOnView: {
      name: '',
      id: ''
    },
    dishes: []
  }
})
@Injectable()
export class OngoingOrderState {

  constructor(
    public dialog: MatDialog,
    private confirmOrderService: CompleteOrderService,
    private restaurantGetById: RestaurantGetByIdService,
    private store: Store,
    private handler: SnackShowErrorService,
    private actions: Actions
  ) { }

  @Selector()
  static itemFromBagToEdit(state: OngoingOrderModel): ItemOnBag {
    return state.dishes.find(item => item.calledToBeEdited) as ItemOnBag;
  }

  @Selector()
  static status(state: OngoingOrderModel): string {
    return state.status;
  }

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
  setRestaurant(ctx: StateContext<OngoingOrderModel>, { payload }: SetRestaurant) {
    const state = ctx.getState();
    if (state.dishes.length) {
      throw new Error('There are items on bag, cannot set a new restaurant');
    }
    ctx.setState({
      ...ctx.getState(),
      restaurant: {
        ...payload
      }
    });
  }

  @Action(ViewRestaurant)
  viewRestaurant(ctx: StateContext<OngoingOrderModel>, { payload }: ViewRestaurant) {
    ctx.setState(
      patch({
        restaurantOnView: { id: payload.id, name: payload.name }
      })
    );
  }

  @Action(AddItemToBag)
  addItemToBag(ctx: StateContext<OngoingOrderModel>, { payload, restaurantId }: AddItemToBag) {
    const i = payload;
    const state = ctx.getState();
    if (state.restaurant && state.restaurant.id !== restaurantId) {
      return this.dialog.open(DishFromAnotherRestaurantHandlerComponent, {
        width: '400px',
        height: '300px',
        data: { restaurantId, payload }
      });
    }
    ctx.setState({
      ...state,
      dishes: [
        ...state.dishes,
        {
          id: i.id,
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
  removeItemFromBag(ctx: StateContext<OngoingOrderModel>, { payload }: RemoveItemFromBag) {
    ctx.setState(
      patch({
        dishes: removeItem<any>(item => item.id === payload.id && item.bagId === payload.bagId)
      })
    );
  }

  @Action(EditItemOnBag)
  editItemOnBag(ctx: StateContext<OngoingOrderModel>, { payload }: EditItemOnBag) {
    ctx.setState(
      patch({
        dishes: updateItem<any>(dish => dish.id === payload.id && dish.bagId === payload.bagId,
          patch({ calledToBeEdited: true }))
      })
    );
  }

  @Action(ItemOnBagEdited)
  itemOnBagEdited(ctx: StateContext<OngoingOrderModel>, edited: ItemOnBagEdited) {
    ctx.setState(
      patch({
        dishes: updateItem<any>(dish => dish.id === edited.itemId && dish.bagId === edited.bagId,
          patch({ calledToBeEdited: false, quantity: edited.quantity }))
      })
    );
  }

  @Action(EmptyBag)
  async emptyBag(ctx: StateContext<OngoingOrderModel>, { newSelectedRestaurant }: EmptyBag) {
    ctx.setState({
      ...ctx.getState(),
      dishes: []
    });
    const restaurant =
      await this.restaurantGetById.get(newSelectedRestaurant)
        .pipe(retryWhen(err => err.pipe(take(2), delay(1500)))).toPromise();
    return this.store.dispatch([new SetRestaurant(restaurant)]);
  }

  @Action(ConfirmOrder)
  confirmOrder(ctx: StateContext<OngoingOrderModel>) {
    ctx.patchState({ status: 'PENDING' });
    const state = ctx.getState();
    const dishes = state.dishes;
    const orderId = state.id;
    // const userId = this.store.selectSnapshot<UserStateModel>(global => global.user.name).name;
    const userId = '123';
    ctx.dispatch([new OrderPending(state.id)]);
    this.confirmOrderService.post(new CompleteOrderDto(userId, dishes as any))
      .pipe(takeUntil(this.actions.pipe(ofActionDispatched(ConfirmOrder))))
      .subscribe(() => ctx.dispatch(new OrderSuccess(orderId)),
        err => {
          this.handler.error(err);
          return ctx.dispatch(new OrderDeclined(orderId));
        });
  }

  @Action(OrderSuccess)
  orderSuccess({ patchState }: StateContext<OngoingOrderModel>) {
    patchState({ status: 'SUCCESS' });
  }

  @Action(OrderDeclined)
  orderDeclined({ patchState }: StateContext<OngoingOrderModel>) {
    patchState({ status: 'DECLINED' });
  }
}
