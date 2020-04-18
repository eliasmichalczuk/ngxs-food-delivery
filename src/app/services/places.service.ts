import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from '../entities/place';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RandomPlaceService {

  private url = '/api/places';

  constructor(
    private http: HttpClient
  ) { }

  randomPlace(): Observable<Place> {
    return this.http.get(this.url)
      .pipe(map(places => this.onePlaceFrom(places as Place[])));
  }

  onePlaceFrom(places: Place[]) {
    return places[Math.floor(Math.random() * places.length)];
  }
}
