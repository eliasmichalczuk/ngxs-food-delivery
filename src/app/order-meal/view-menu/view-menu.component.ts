import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dish } from 'src/app/entities/dish';
import { Restaurant } from 'src/app/entities/restaurant';

import { OngoingOrderState, RestaurantOnView } from '../store/ongoing-order.state';
import { GetMenuByRestauranteIdService } from './../../services/get-menu-by-restaurante-id.service';
import { DishDetailsModalComponent } from './../../shared/components/dish-details-modal/dish-details-modal.component';
import { ItemOnBag } from './../entities/item-on-bag';

@Component({
  selector: 'app-view-menu',
  templateUrl: './view-menu.component.html',
  styleUrls: ['./view-menu.component.sass']
})
export class ViewMenuComponent implements OnInit {
  dishes: Observable<Dish[]>;
  @Select(state => state.ongoingOrder.restaurantOnView) restaurant$: Observable<RestaurantOnView>;
  @Select(OngoingOrderState.itemFromBagToEdit) itemFromBagToEdit$: Observable<ItemOnBag>;
  restaurantId: string;

  constructor(
    private menuService: GetMenuByRestauranteIdService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.editItem();
    this.restaurant$.subscribe(res => {
      if (res) {
        this.restaurantId = res.id;
        this.dishes =  this.menuService.get(res.id)
          .pipe(map(menu => menu[0].dishes));
      }
    });
  }

  select(item: Dish) {
    this.dialog.open(DishDetailsModalComponent, {
      width: '600px',
      height: '700px',
      data: {item, restaurantId: this.restaurantId}
    });
  }

  editItem() {
    this.itemFromBagToEdit$.subscribe(item => {
      if (item) {
        this.select(item as any);
      }
    });
  }
}
