import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from './../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket;
  imagesSubject = new Subject<string[]>();

  constructor() { }

  setUpSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('my message', 'give me images');
    this.socket.on('images', (data: string[]) => {
      this.imagesSubject.next(data);
    });
  }
}
