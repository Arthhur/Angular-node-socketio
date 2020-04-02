import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  api = environment.SOCKET_ENDPOINT;
  private imagesSubject$ = new BehaviorSubject<string[]>([]);
  imagesChanged = this.imagesSubject$.asObservable();
  images: string[];
  constructor(private http: HttpClient) { }

  getImages() {
    this.http.get<any>(`${this.api}/images`).pipe(
      map(img => img.images),
      catchError(err => of([]))
    )
    .subscribe(images => {
      this.images = images;
      this.imagesSubject$.next(this.images);
    });
  }

  addImage(fd: FormData) {
    return this.http.post(`${this.api}/images`, fd);
  }

  deleteImage(id: string) {
    this.http.delete(`${this.api}/images/${id}`)
      .subscribe(
        res => this.getImages(),
        error => console.log(error)
      );
  }
}
