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
    @Inject(MAT_DIALOG_DATA) public data: Dish | ItemOnBag,
    private store: Store
  ) {
      // tslint:disable-next-line:no-string-literal
    if (this.data['quantity']) {
      // tslint:disable-next-line:no-string-literal
      this.quantity = this.data['quantity'];
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
    if (this.data['bagId']) {
      // tslint:disable-next-line:no-string-literal
      this.store.dispatch([new ItemOnBagEdited(this.data.id, this.data['bagId'], this.quantity)]);
    } else {
      this.store.dispatch([
        new AddItemToBag(
          new ItemOnBag(this.data.id, this.data.name,
            this.data.description, this.data.price,
            this.data.currency, this.quantity)
        )
      ]);
    }
    this.dialogRef.close();
  }
}
