import { Dish } from 'src/app/entities/dish';
import { GetMenuByRestauranteIdService } from './../../services/get-menu-by-restaurante-id.service';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/app/entities/restaurant';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-view-menu',
  templateUrl: './view-menu.component.html',
  styleUrls: ['./view-menu.component.sass']
})
export class ViewMenuComponent implements OnInit {
  dishes: Observable<Dish[]>;
  @Select(state => state.ongoingOrder.restaurant) restaurant$: Observable<Restaurant>;

  constructor(
    private menuService: GetMenuByRestauranteIdService
  ) { }

  ngOnInit(): void {
    this.restaurant$.subscribe(res => {
      if (res) {
        this.dishes =  this.menuService.get(res.id).pipe(map(menu => menu[0].dishes), tap(e => console.log(e)));
      }
    });
  }

}
