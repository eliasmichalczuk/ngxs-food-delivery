import { Store, Select } from '@ngxs/store';
import { Restaurant } from './../../entities/restaurant';
import { GetAllRestaurantService } from './../../services/get-all-restaurant.service';
import { Component, OnInit } from '@angular/core';
import { OrderMealStepperServiceService } from '../services/order-meal-stepper-service.service';
import { FormControl, AbstractControl } from '@angular/forms';
import { SetRestaurant } from '../store/order.state';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.sass']
})
export class ViewRestaurantComponent implements OnInit {

  restaurants: Restaurant[];
  @Select() ongoingOrder$;
  selected: Restaurant;
  isVeingViewed: boolean;

  get stepOneForm() {
    return this.stepperService.stepOneForm;
  }

  get selectedRestaurantId(): AbstractControl {
    return this.stepOneForm.get('selectedRestaurantId');
  }

  constructor(
    private stepperService: OrderMealStepperServiceService,
    private getAllRestaurant: GetAllRestaurantService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this.getAllRestaurant.get().pipe()
      .subscribe(list => this.restaurants = list);
  }

  select(item: Restaurant) {
    if (this.selected && item.id === this.selected.id) {
      return this.showHideDetailsCard();
    }
    this.isVeingViewed = true;
    this.selected = item;
    this.selectedRestaurantId.setValue(item.id);
    this.store.dispatch([
      new SetRestaurant(item)
    ]);
  }

  showHideDetailsCard() {
    this.isVeingViewed = !this.isVeingViewed;
  }

  restaurantComparer(item: Restaurant) {
    return this.selected ? item.id === this.selected.id : false;
  }
}
