import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { DishDetailsModalComponent } from './dish-details-modal.component';


@NgModule({
  declarations: [DishDetailsModalComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  providers: [MatDialog],
  exports: [DishDetailsModalComponent]
})
export class DishDetailsModalModule { }
