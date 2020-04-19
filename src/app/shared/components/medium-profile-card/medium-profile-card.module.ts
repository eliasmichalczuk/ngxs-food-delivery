import { MediumProfileCardComponent } from './medium-profile-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [MediumProfileCardComponent],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [MediumProfileCardComponent]
})
export class MediumProfileCardModule { }
