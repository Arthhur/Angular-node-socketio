import { Component, OnInit } from '@angular/core';
import { SocketioService } from './socketio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  imgSubscription: Subscription;
  images: string[];
  constructor(private socketService: SocketioService) {}

  ngOnInit() {
    this.socketService.setUpSocketConnection();
    this.imgSubscription = this.socketService.imagesSubject.subscribe(img => {
      this.images = img;
      console.log(this.images);
    });
  }
}
