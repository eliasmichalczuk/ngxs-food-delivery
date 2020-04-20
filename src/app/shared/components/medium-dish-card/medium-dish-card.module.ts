import { MediumDishCardComponent } from './medium-dish-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [MediumDishCardComponent],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [MediumDishCardComponent]
})
export class MediumDishCardModule { }
