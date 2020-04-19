import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderMealStepperServiceService } from '../services/order-meal-stepper-service.service';

@Component({
  selector: 'app-order-meal',
  templateUrl: './order-meal.component.html',
  styleUrls: ['./order-meal.component.sass']
})
export class OrderMealComponent implements OnInit {
  secondFormGroup: FormGroup;

  get stepOneForm() {
    return this.stepperService.stepOneForm;
  }

  constructor(
    private formBuilder: FormBuilder,
    private stepperService: OrderMealStepperServiceService
  ) {}

  ngOnInit() {
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
