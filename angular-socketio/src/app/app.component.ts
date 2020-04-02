import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SocketioService } from './socketio.service';
import { Subscription, Observable } from 'rxjs';
import { AnimationType } from './components/carousel/carousel.animations';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ImageService } from './image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
