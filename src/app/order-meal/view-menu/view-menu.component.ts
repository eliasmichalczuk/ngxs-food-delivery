import { DishDetailsModalComponent } from './../../shared/components/dish-details-modal/dish-details-modal.component';
import { AddItemToBag } from './../store/order.state';
import { ItemOnBag } from './../entities/item-on-bag';
import { Dish } from 'src/app/entities/dish';
import { GetMenuByRestauranteIdService } from './../../services/get-menu-by-restaurante-id.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/entities/restaurant';
import { map, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-menu',
  templateUrl: './view-menu.component.html',
  styleUrls: ['./view-menu.component.sass']
})
export class ViewMenuComponent implements OnInit {
  dishes: Observable<Dish[]>;
  @Select(state => state.ongoingOrder.restaurant) restaurant$: Observable<Restaurant>;

  constructor(
    private menuService: GetMenuByRestauranteIdService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.restaurant$.subscribe(res => {
      if (res) {
        this.dishes =  this.menuService.get(res.id)
          .pipe(map(menu => menu[0].dishes));
      }
    });
  }

  select(item: Dish) {
    this.dialog.open(DishDetailsModalComponent, {
      width: '600px',
      height: '700px',
      data: item
    });
  }
}
