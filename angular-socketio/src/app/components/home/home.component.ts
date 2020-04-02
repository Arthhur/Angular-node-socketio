import { Component, OnInit, ViewChild } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { Observable } from 'rxjs';
import { AnimationType } from '../carousel/carousel.animations';
import { SocketioService } from 'src/app/socketio.service';
import { ImageService } from 'src/app/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
      this.imageService.getImages();
      this.images$ = this.imageService.imagesChanged;
      setInterval( () => {
      this.imageService.getImages();
      }, 60000);
    }

    setAnimationType(type) {
      this.animationType = type.value;
      setTimeout(() => {
        this.carousel.onNextClick();
      });
    }

}
