import { UserRegistered } from './../../../store/user.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Dish } from 'src/app/entities/dish';
import { ItemOnBag } from 'src/app/order-meal/entities/item-on-bag';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.sass']
})
export class CreateAccountModalComponent implements OnInit {

  userForm: FormGroup;

  get email() {
    return this.userForm.get('email');
  }
  get name() {
    return this.userForm.get('name');
  }
  get phone() {
    return this.userForm.get('phone');
  }
  constructor(
    public dialogRef: MatDialogRef<CreateAccountModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dish | ItemOnBag,
    private store: Store,
    public fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  confirm() {
    this.store.dispatch([
      new UserRegistered({
        email: this.email.value,
        name: this.name.value,
        phone: this.phone.value
      })
    ]);
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
