import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {
  class: string;
  message: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data.sb;
    this.class = data.class;
  }

}
