import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderMealStepperServiceService } from '../services/order-meal-stepper-service.service';

@Component({
  selector: 'app-order-meal',
  templateUrl: './order-meal.component.html',
  styleUrls: ['./order-meal.component.sass']
})
export class OrderMealComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private stepperService: OrderMealStepperServiceService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
