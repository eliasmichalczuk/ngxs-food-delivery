import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Restaurant } from 'src/app/entities/restaurant';
import { ItemOnBag } from 'src/app/order-meal/entities/item-on-bag';

import { OngoingOrderState } from '../store/ongoing-order.state';
import { ConfirmOrder, EditItemOnBag, RemoveItemFromBag } from '../store/ongoing-order.actions';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BagComponent implements OnInit {

  @Select(state => state.ongoingOrder.restaurant) restaurant$: Observable<Restaurant>;
  @Select(OngoingOrderState.status) status$: Observable<string>;
  @Select(state => state.ongoingOrder.dishes) dishes$: Observable<ItemOnBag[]>;
  @Select(OngoingOrderState.deliveryFee) deliveryFee$: Observable<number>;
  @Select(OngoingOrderState.dishesSubTotal) dishesSubtotal$: Observable<number>;
  @Select(OngoingOrderState.orderTotal) dishesTotal$: Observable<number>;
  currency$: Observable<string>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.currency();
  }

  edit(item: ItemOnBag) {
    this.store.dispatch([
      new EditItemOnBag(item)
    ]);
  }

  remove(item: ItemOnBag) {
    this.store.dispatch([
      new RemoveItemFromBag(item)
    ]);
  }

  sumOrderTotalPrice() {
    this.dishesTotal$ = combineLatest(this.dishes$, this.deliveryFee$).pipe(map(items => {
      let total = 0;
      const dishes = items[0];
      dishes.forEach(item => total += item.price * item.quantity);
      total += items[1];
      return total;
    }));
  }

  dishesSubtotal() {
    this.dishesSubtotal$ = this.dishes$.pipe(map(items => {
      let total = 0;
      items.forEach(item => total += item.price * item.quantity);
      return total;
    }));
  }

  currency() {
    this.currency$ = this.dishes$.pipe(map(items => items[0].currency));
  }

  confirmOrder() {
    this.store.dispatch([
      new ConfirmOrder()
    ]);
  }
}
