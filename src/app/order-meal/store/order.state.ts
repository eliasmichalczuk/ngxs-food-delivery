import { Restaurant } from 'src/app/entities/restaurant';
import { ItemOnBag } from '../entities/item-on-bag';

export class SetRestaurant {
  static readonly type = '[order-meal.component] SetRestaurant';
  constructor(public payload: Restaurant) { }
}

export class AddItemToBag {
  static readonly type = '[view-menu.component] AddItemToBag';
  constructor(public payload: ItemOnBag) { }
}

export class RemoveItemFromBag {
  static readonly type = '[view-menu.component] RemoveItemFromToBag';
  constructor(public payload: ItemOnBag) { }
}

export class ConfirmOrder {
  static readonly type = '[bag.component] ConfirmOrder';
  constructor() { }
}
export class OrderPending {
  static readonly type = '[order.actions] OrderPending';
  constructor(public orderId: number) { }
}
export class OrderSuccess {
  static readonly type = '[order.actions] OrderSuccess';
  constructor(public orderId: number) { }
}

export class OrderFailed {
  static readonly type = '[order.actions] OrderFailed';
  constructor(public orderId: number) { }
}
