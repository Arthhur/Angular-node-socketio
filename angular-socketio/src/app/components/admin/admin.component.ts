import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ImageService } from './../../image.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar/snackbar.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  api = environment.SOCKET_ENDPOINT;
  selectedFile = null;
  constructor(private http: HttpClient, private imageService: ImageService, private snackBar: MatSnackBar) { }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const fd =  new FormData();
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    const title =   (<HTMLInputElement> document.getElementById('title')).value;
    fd.append('image', this.selectedFile);
    fd.append('title', title);
    this.imageService.addImage(fd)
      .subscribe(
        res => {
          this.selectedFile = null;
          // tslint:disable-next-line:no-angle-bracket-type-assertion
          (<HTMLInputElement> document.getElementById('title')).value = '';
          this.imageService.getImages();
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 3 * 1000,
            panelClass: ['success'],
            data: {sb: 'Image ajouée avec succès ✔️', class: 'success'}
          });
        },
        error => {
          this.selectedFile = null;
          // tslint:disable-next-line:no-angle-bracket-type-assertion
          (<HTMLInputElement> document.getElementById('title')).value = '';
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 3 * 1000,
            panelClass: ['fail'],
            data: {sb: `${error.error.error.message} ❌`, class: 'fail'}
          });
        }
      );
  }

}
