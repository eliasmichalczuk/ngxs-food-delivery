import { SetPlace } from './../../state/app.actions';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Place } from 'src/app/entities/place';
import { RandomPlaceService } from 'src/app/services/places.service';
import { AppState } from 'src/app/state/app.state';
import { Store, Select } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Navigate } from 'src/app/state/router.state';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.sass']
})
export class HelloComponent implements OnInit {

  place$: Observable<Place>;
  selectedPlace: Place;
  @Select() app$;
  // state: Observable<AppState>;

  constructor(
    private randomPlaceService: RandomPlaceService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.reroll();
  }

  proceedToOrderMeal() {
    // this.router.navigate(['/order-meal']);
    this.store.dispatch([
      new SetPlace(this.selectedPlace),
      new Navigate('order-meal')
    ]);
  }

  reroll() {
    this.place$ = this.randomPlaceService.randomPlace()
      .pipe(tap(place => this.selectedPlace = place));
  }
}
