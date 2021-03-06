import { GetMenuByRestauranteIdService } from './../../services/get-menu-by-restaurante-id.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderMealStepperServiceService } from '../services/order-meal-stepper-service.service';
import { Select, Store } from '@ngxs/store';
import { Restaurant } from 'src/app/entities/restaurant';
import { RestaurantOnView } from '../store/ongoing-order.state';

@Component({
  selector: 'app-order-meal',
  templateUrl: './order-meal.component.html',
  styleUrls: ['./order-meal.component.sass']
})
export class OrderMealComponent implements OnInit {

  get stepOneForm() {
    return this.stepperService.stepOneForm;
  }

  get stepTwoForm() {
    return this.stepperService.stepTwoForm;
  }

  @Select(state => state.ongoingOrder.restaurantOnView) restaurant$: Observable<RestaurantOnView>;

  constructor(
    private stepperService: OrderMealStepperServiceService,
  ) {}

  ngOnInit() {
  }

}
