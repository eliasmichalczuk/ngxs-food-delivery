import { ViewRestaurantComponent } from './view-restaurant/view-restaurant.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderMealRoutingModule } from './order-meal-routing.module';
import { OrderMealComponent } from './order-meal/order-meal.component';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MediumProfileCardModule } from '../shared/components/medium-profile-card/medium-profile-card.module';
import { OrderMealStepperServiceService } from './services/order-meal-stepper-service.service';

@NgModule({
  declarations: [ViewRestaurantComponent, OrderMealComponent],
  imports: [
    CommonModule,
    OrderMealRoutingModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MediumProfileCardModule
  ],
  providers: [
    OrderMealStepperServiceService
  ]
})
export class OrderMealModule { }
