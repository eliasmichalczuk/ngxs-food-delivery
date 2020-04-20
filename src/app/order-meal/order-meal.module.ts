import { DishDetailsModalModule } from './../shared/components/dish-details-modal/dish-details-modal.module';
import { OngoingOrder } from './store/order.actions';
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
import { GetAllRestaurantService } from '../services/get-all-restaurant.service';
import { NgxsModule } from '@ngxs/store';
import { AppState } from '../store/app.state';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ViewMenuComponent } from './view-menu/view-menu.component';
import { GetMenuByRestauranteIdService } from '../services/get-menu-by-restaurante-id.service';
import { MediumDishCardModule } from '../shared/components/medium-dish-card/medium-dish-card.module';
import { BagComponent } from './bag/bag.component';
import { CompleteOrderService } from './services/complete-order.service';

@NgModule({
  declarations: [ViewRestaurantComponent, OrderMealComponent, ViewMenuComponent, BagComponent],
  imports: [
    CommonModule,
    OrderMealRoutingModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatButtonModule,
    MatCardModule,
    MediumProfileCardModule,
    MediumDishCardModule,
    DishDetailsModalModule,
    NgxsModule.forFeature([
      AppState,
      OngoingOrder
    ])
  ],
  providers: [
    OrderMealStepperServiceService,
    GetAllRestaurantService,
    GetMenuByRestauranteIdService,
    CompleteOrderService
  ]
})
export class OrderMealModule { }
