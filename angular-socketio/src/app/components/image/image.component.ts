import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageService } from 'src/app/image.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit, OnDestroy {
  images: string[];
  subscription = new Subscription();

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.subscription.add(this.imageService.imagesChanged.subscribe(
      images => this.images = images
    ));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
