import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { User } from './entities/user';
import { CreateAccountModalComponent } from './shared/components/create-account-modal/create-account-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  @Select(state => state.user) user$: Observable<User>;
  constructor(
    public dialog: MatDialog
  ) { }

  createAccount() {
    this.dialog.open(CreateAccountModalComponent, {
      width: '500px',
      height: '500px'
    });
  }
}
