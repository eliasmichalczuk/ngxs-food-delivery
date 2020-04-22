import { ItemOnBag } from 'src/app/order-meal/entities/item-on-bag';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, forkJoin, concat, merge, zip, combineLatest } from 'rxjs';
import { Restaurant } from 'src/app/entities/restaurant';
import { RemoveItemFromBag, ConfirmOrder } from '../../order-meal/store/order.state';
import { map, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BagComponent implements OnInit {

  @Select(state => state.ongoingOrder.restaurant) restaurant$: Observable<Restaurant>;
  @Select(state => state.ongoingOrder.dishes) dishes$: Observable<ItemOnBag[]>;
  dishesTotal$: Observable<number>;
  deliveryFee$: Observable<number>;
  dishesSubtotal$: Observable<number>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.deliveryFee();
    this.sumOrderTotalPrice();
  }

  edit() {
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
    this.dishesSubtotal$ = this.dishes$.pipe(map(items => {
      let total = 0;
      items.forEach(item => total += item.price * item.quantity);
      return total;
    }));
  }

  deliveryFee() {
    this.deliveryFee$ = this.dishes$.pipe(map(items => items[0].price * 0.6));
  }

  confirmOrder() {
    this.store.dispatch([
      new ConfirmOrder()
    ]);
  }
}
