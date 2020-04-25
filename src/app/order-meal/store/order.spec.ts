import { HttpResponse } from '@angular/common/http';
import { AppState } from 'src/app/store/app.state';
import { CompleteOrderService } from './../services/complete-order.service';
import { Restaurant } from 'src/app/entities/restaurant';
import { SetRestaurant, ConfirmOrder, OrderSuccess } from './order.state';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { OngoingOrderState } from './order.actions';
import { Observable, of } from 'rxjs';
import { SnackShowErrorService } from 'src/app/shared/components/consumables/snack-show-error/snack-show-error.service';
import { Actions, ofActionDispatched } from '@ngxs/store';
class CompleteOrderServiceMock {
  post(...params): Observable<any> {
    return of([]);
  }
}
class SnackShowErrorServiceMock {
  error(...params) {}
}
fdescribe('order.spec | OnGoingOrderState', () => {
  let actions: Actions;
  let orderState: OngoingOrderState;
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([
          OngoingOrderState,
          AppState
        ])
      ],
      providers: [
        {
          provide: CompleteOrderService,
          useClass: CompleteOrderServiceMock
        },
        {
          provide: SnackShowErrorService,
          useClass: SnackShowErrorServiceMock
        },
        Actions
      ]
    })
    .compileComponents();
    orderState = TestBed.inject(OngoingOrderState);
    actions = TestBed.inject(Actions);
    store = TestBed.inject(Store);
  }));

  it('should set restaurant', () => {
    store.dispatch([new SetRestaurant({id: 'restaurant-id'} as any)]);
    expect(store.selectSnapshot(state => state.ongoingOrder.restaurant.id)).toEqual('restaurant-id');
  });

  fit('should dispatch OrderSuccess', fakeAsync((done) => {
    // tslint:disable-next-line:no-string-literal
    const spy = spyOn(orderState['confirmOrderService'], 'post')
      .and.returnValue(of(new HttpResponse({body: '213'})));
    store.reset({
      app: {
        user: {
          name: 'user-name'
        }
      },
      ongoingState: {
        id: 123,
        status: 'NONE',
        restaurant: {
          id: 'rest-id',
          name: 'rest-name',
          address: {},
        },
        dishes: [{
          id: 'dish-1-id',
          name: 'dish-1-name',
          description: 'good food',
          price: 2300,
          currency: 'R$',
          quantity: 2,
          bagId: 'bagd-id',
          calledToBeEdited: false
        }]
      }
    });
    let actDispatched = false;
    actions.pipe(ofActionDispatched(OrderSuccess))
    .subscribe(() => {
      done();
      actDispatched = true;
    });
    store.dispatch([new ConfirmOrder()]).subscribe(() => {
      expect(actDispatched).toBeTrue();
    });
    tick(5000);
  }));
});
