import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountModalComponent } from './create-account-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
@NgModule({
  declarations: [CreateAccountModalComponent],
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
  exports: [CreateAccountModalComponent]
})
export class CreateAccountModalModule { }
