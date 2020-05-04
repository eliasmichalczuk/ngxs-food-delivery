import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../entities/restaurant';

@Injectable()
export class RestaurantGetByIdService {

  private url = '/api/restaurants/{0}';

  constructor(
    private http: HttpClient
  ) { }

  get(id: string): Observable<Restaurant> {
    return this.http.get(this.url.replace('{0}', id)) as Observable<Restaurant>;
  }
}
