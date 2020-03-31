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
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(CarouselComponent) carousel: CarouselComponent;
  images$: Observable<string[]>;
  animationType = AnimationType.Scale;

  animationTypes = [
    {
      name: 'Scale',
      value: AnimationType.Scale
    },
    {
      name: 'Fade',
      value: AnimationType.Fade
    },
    {
      name: 'Flip',
      value: AnimationType.Flip
    },
    {
      name: 'Jack In The Box',
      value: AnimationType.JackInTheBox
    }
  ];
  constructor(private socketService: SocketioService, private imageService: ImageService) {}

  ngOnInit() {
   /* this.socketService.setUpSocketConnection();
    this.socketService.imagesSubject.subscribe(img => this.images = img);*/
    this.images$ = this.imageService.getImages();
    setInterval( () => {
      this.images$ = this.imageService.getImages();
    }, 60000);
  }

  setAnimationType(type) {
    this.animationType = type.value;
    setTimeout(() => {
      this.carousel.onNextClick();
    });
  }

  ngOnDestroy() {
  }
}
