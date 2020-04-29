import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxsModule } from '@ngxs/store';

import { GetAllRestaurantService } from '../services/get-all-restaurant.service';
import { GetMenuByRestauranteIdService } from '../services/get-menu-by-restaurante-id.service';
import { MediumDishCardModule } from '../shared/components/medium-dish-card/medium-dish-card.module';
import { MediumProfileCardModule } from '../shared/components/medium-profile-card/medium-profile-card.module';
import { NumberPipeModule } from '../shared/pipes/number-pipe/number-pipe.module';
import { AppState } from '../store/app.state';
import { DishDetailsModalModule } from './../shared/components/dish-details-modal/dish-details-modal.module';
import { BagComponent } from './bag/bag.component';
import { OrderMealRoutingModule } from './order-meal-routing.module';
import { OrderMealComponent } from './order-meal/order-meal.component';
import { CompleteOrderService } from './services/complete-order.service';
import { OrderMealStepperServiceService } from './services/order-meal-stepper-service.service';
import { OngoingOrderState } from './store/ongoing-order.state';
import { ViewMenuComponent } from './view-menu/view-menu.component';
import { ViewRestaurantComponent } from './view-restaurant/view-restaurant.component';

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
    NumberPipeModule,
    MatProgressSpinnerModule,
    NgxsModule.forFeature([
      OngoingOrderState,
      AppState
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
