import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrder } from 'src/app/entities/create-order';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class OrderMealStepperServiceService {
  private dataFn: Array<() => void> = [() => {}, () => {}];
  private forms: Array<() => boolean> = [];
  private orderData: CreateOrder = CreateOrder.empty();
  private stepperForms: FormGroup;

  get stepOneForm() {
    return this.stepperForms.get('stepOne') as FormGroup;
  }

  get stepTwoForm() {
    return this.stepperForms.get('stepTwo') as FormGroup;
  }


  constructor(
    private formBuilder: FormBuilder
  ) {
    this.stepperForms = this.formBuilder.group({
      stepOne: this.formBuilder.group({
        selectedRestaurantId: ['', Validators.required]
      }),
      stepTwo: this.formBuilder.group({
        dishes: [[], [Validators.required, Validators.min(1)]]
      })
    });
  }

  addFormValidation(validation: () => boolean, stepperPosition: number) {
    this.forms.splice(stepperPosition - 1, 0, validation);
  }

  isFormValid(currentStep: number): boolean {
    return this.forms[currentStep - 1]();
  }

  addDataFn(dataFn: () => void, stepperPosition: number) {
    this.dataFn.splice(stepperPosition - 1, 1, dataFn);
  }

  save() {
    for (const setComponentValueToPostEntity of this.dataFn) {
      setComponentValueToPostEntity();
    }
  }

  empty() {
    this.orderData =  CreateOrder.empty();
  }
}
