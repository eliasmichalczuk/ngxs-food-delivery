import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { ItemOnBag } from 'src/app/order-meal/entities/item-on-bag';

import { AddItemToBag, EmptyBag } from './../../../order-meal/store/ongoing-order.actions';

@Component({
  selector: 'app-dish-from-another-restaurant-handler',
  templateUrl: './dish-from-another-restaurant-handler.component.html',
  styleUrls: ['./dish-from-another-restaurant-handler.component.sass']
})
export class DishFromAnotherRestaurantHandlerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DishFromAnotherRestaurantHandlerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { restaurantId: string, payload: ItemOnBag },
    private store: Store,
  ) {
  }

  ngOnInit(): void {
  }

  confirm() {
    this.store.dispatch([new EmptyBag(this.data.restaurantId)]).subscribe(() => {
      this.store.dispatch([new AddItemToBag(this.data.payload, this.data.restaurantId)]);
      this.dialogRef.close();
    }, (err) => {
      console.log(err);
      throw new Error('Error emptying the bag.');
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
