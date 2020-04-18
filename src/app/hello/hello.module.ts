import { AppState } from 'src/app/store/app.state';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';

import { RandomPlaceService } from '../services/places.service';
import { HelloRoutingModule } from './hello-routing.module';
import { HelloComponent } from './hello/hello.component';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [HelloComponent],
  imports: [
    CommonModule,
    HelloRoutingModule,
    MatChipsModule,
    MatButtonModule,
    MatStepperModule,
    NgxsModule.forFeature([AppState])
  ],
  providers: [
    RandomPlaceService
  ]
})
export class HelloModule { }
