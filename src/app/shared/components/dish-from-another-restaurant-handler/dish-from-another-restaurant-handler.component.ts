import { EmptyBag, AddItemToBag } from './../../../order-meal/store/ongoing-order.actions';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateAccountModalComponent } from '../create-account-modal/create-account-modal.component';
import { Dish } from 'src/app/entities/dish';
import { ItemOnBag } from 'src/app/order-meal/entities/item-on-bag';
import { Store } from '@ngxs/store';
import { UserRegistered } from 'src/app/store/user.actions';

@Component({
  selector: 'app-dish-from-another-restaurant-handler',
  templateUrl: './dish-from-another-restaurant-handler.component.html',
  styleUrls: ['./dish-from-another-restaurant-handler.component.sass']
})
export class DishFromAnotherRestaurantHandlerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateAccountModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {restaurantId: string, payload: ItemOnBag},
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
