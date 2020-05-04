import { AddItemToBag, ItemOnBagEdited } from '../../../order-meal/store/ongoing-order.actions';
import { Dish } from './../../../entities/dish';
import { Component, OnInit, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { ItemOnBag } from 'src/app/order-meal/entities/item-on-bag';

@Component({
  selector: 'app-dish-details-modal',
  templateUrl: './dish-details-modal.component.html',
  styleUrls: ['./dish-details-modal.component.sass']
})
export class DishDetailsModalComponent implements OnInit {

  quantity = 1;
  constructor(
    public dialogRef: MatDialogRef<DishDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {item: Dish | ItemOnBag, restaurantId: string},
    private store: Store
  ) {
      // tslint:disable-next-line:no-string-literal
    if (this.data.item['quantity']) {
      // tslint:disable-next-line:no-string-literal
      this.quantity = data.item['quantity'];
    }
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  more() {
    this.quantity++;
  }

  less() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  confirm() {
    // tslint:disable-next-line:no-string-literal
    if (this.data.item['bagId']) {
      const castedItem = this.data.item as ItemOnBag;
      this.store.dispatch([new ItemOnBagEdited(castedItem.id, castedItem.bagId, this.quantity)]);
    } else {
      const castedItem = this.data.item as Dish;
      this.store.dispatch([
        new AddItemToBag(
          new ItemOnBag(castedItem.id, castedItem.name,
            castedItem.description, castedItem.price,
            castedItem.currency, this.quantity), this.data.restaurantId
        )
      ]);
    }
    this.dialogRef.close();
  }
}
