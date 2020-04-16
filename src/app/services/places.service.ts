import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PlacesService {

  private url = 'http://locahost:3000/places';

  constructor(
    private http: HttpClient
  ) { }

  randomPlace() {
    return this.http.get(this.url);
  }
}
