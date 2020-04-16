import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelloRoutingModule } from './hello-routing.module';
import { HelloComponent } from './hello/hello.component';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [HelloComponent],
  imports: [
    CommonModule,
    HelloRoutingModule,
    MatChipsModule
  ]
})
export class HelloModule { }
