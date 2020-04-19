import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../entities/restaurant';

@Injectable()
export class GetAllRestaurantService {

  private url = '/api/restaurants';

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Restaurant[]> {
    return this.http.get(this.url) as Observable<Restaurant[]>;
  }
}
