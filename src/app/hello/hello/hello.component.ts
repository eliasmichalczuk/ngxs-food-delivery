import { SetPlace, SetTest } from './../../store/app.actions';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Place } from 'src/app/entities/place';
import { RandomPlaceService } from 'src/app/services/places.service';
import { AppState } from 'src/app/store/app.state';
import { Store, Select } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.sass']
})
export class HelloComponent implements OnInit {

  currentVisiblePlace$: Observable<Place>;
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
    this.store.dispatch([
      new SetPlace(this.selectedPlace),
      new Navigate(['/order-meal'])
    ]);
  }

  reroll() {
    this.currentVisiblePlace$ = this.randomPlaceService.randomPlace()
      .pipe(tap(place => this.selectedPlace = place));
  }
}
