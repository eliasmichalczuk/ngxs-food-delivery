import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackShowErrorService {

  constructor(private snackBar: MatSnackBar) {
  }

  error(error: HttpErrorResponse) {
    this.snackBar.open(error.statusText, ':(', {
      duration: 2000,
      politeness: 'assertive'
    });
  }
}
