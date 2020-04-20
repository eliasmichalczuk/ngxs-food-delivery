import { Component, OnInit, Input } from '@angular/core';
import { Dish } from 'src/app/entities/dish';

@Component({
  selector: 'app-medium-dish-card',
  templateUrl: './medium-dish-card.component.html',
  styleUrls: ['./medium-dish-card.component.sass']
})
export class MediumDishCardComponent implements OnInit {

  @Input() dish: Dish;

  constructor() { }

  ngOnInit(): void {
  }

}
