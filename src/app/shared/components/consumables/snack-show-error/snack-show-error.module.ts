import { SnackShowErrorService } from './snack-show-error.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [],
  imports: [
    MatSnackBarModule,
    CommonModule
  ],
  exports: []
})
export class SnackShowErrorModule { }
