import { CompleteOrderDto } from './../../entities/complete-order';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable()
export class CompleteOrderService {

  private url = '/api/completeOrder';

  constructor(
    private http: HttpClient
  ) { }

  post(order: CompleteOrderDto): Observable<any> {
    return of([]).pipe(map(() => {
      if (this.cardDeclined()) {
        throw new HttpErrorResponse({error: 406, statusText: 'Payment information invalid'});
      } else {
        return new HttpResponse({status: 200, statusText: 'OK!'});
      }
    }), delay(Math.random() * 500 * 1.1));
  }

  private cardDeclined() {
    return Math.random() >= 0.5;
  }
}
