import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../entities/restaurant';
import { Dish } from '../entities/dish';
import { Menu } from '../entities/menu';

@Injectable()
export class GetMenuByRestauranteIdService {

  private url = '/api/restaurants/id/menus';

  constructor(
    private http: HttpClient
  ) { }

  get(id: string): Observable<Menu[]> {
    return this.http.get(this.url.replace('id', id)) as Observable<Menu[]>;
  }
}
