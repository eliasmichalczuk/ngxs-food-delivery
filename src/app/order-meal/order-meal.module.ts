import { ViewRestaurantComponent } from './view-restaurant/view-restaurant.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderMealRoutingModule } from './order-meal-routing.module';


@NgModule({
  declarations: [ViewRestaurantComponent],
  imports: [
    CommonModule,
    OrderMealRoutingModule
  ]
})
export class OrderMealModule { }
