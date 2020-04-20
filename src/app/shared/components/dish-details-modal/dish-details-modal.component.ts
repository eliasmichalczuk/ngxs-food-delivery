import { AddItemToBag } from './../../../order-meal/store/order.state';
import { Dish } from './../../../entities/dish';
import { Component, OnInit, Inject } from '@angular/core';
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
    @Inject(MAT_DIALOG_DATA) public data: Dish,
    private store: Store
  ) { }

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
    this.store.dispatch([
      new AddItemToBag(
        new ItemOnBag(this.data.id, this.data.name,
          this.data.description, this.data.price,
          this.data.currency, this.quantity)
      )
    ]);
    this.dialogRef.close();
  }
}
