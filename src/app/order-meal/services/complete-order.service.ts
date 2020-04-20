import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CompleteOrderService {

  private url = '/api/completeOrder';

  constructor(
    private http: HttpClient
  ) { }

  post(order: any): Observable<HttpResponse<any>> {
    return this.http.post(this.url, order) as Observable<HttpResponse<any>>;
  }
}
