import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  api = environment.SOCKET_ENDPOINT;
  constructor(private http: HttpClient) { }

  getImages(): Observable<string[]> {
    return this.http.get<any>(`${this.api}/images`).pipe(
      map(img => img.images),
      catchError(err => of([]))
    );
  }
}
