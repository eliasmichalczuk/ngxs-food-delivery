import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Place } from 'src/app/entities/place';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.sass']
})
export class HelloComponent implements OnInit {
  place: Observable<Place>;
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.reroll();
  }

  proceedToOrderMeal() {
    this.router.navigate(['/order-meal']);
  }

  reroll() {
    this.place = this.
  }
}
