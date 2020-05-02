import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishFromAnotherRestaurantHandlerComponent } from './dish-from-another-restaurant-handler.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [DishFromAnotherRestaurantHandlerComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgxsFormPluginModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [DishFromAnotherRestaurantHandlerComponent]
})
export class DishFromAnotherRestaurantHandlerModule { }
