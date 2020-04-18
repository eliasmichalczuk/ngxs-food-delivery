import { Component, OnInit } from '@angular/core';
import { OrderMealStepperServiceService } from '../services/order-meal-stepper-service.service';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.sass']
})
export class ViewRestaurantComponent implements OnInit {

  constructor(
    private stepperService: OrderMealStepperServiceService
  ) { }

  ngOnInit(): void {
  }

}
