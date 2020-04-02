import { Component, Input, OnChanges } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ImageService } from './../image.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnChanges {
  /** Based on the screen size, switch from standard to one column per row */
  @Input() images: string[];
  col = 3;
  imgs;

  constructor(private breakpointObserver: BreakpointObserver, private imageService: ImageService) {
    this.imageService.getImages();
    this.imgs = this.imageService.imagesChanged;
  }


  ngOnChanges() {
    this.imgs = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          this.col = 3;
          return this.images;
        }
        this.col = 1;
        return this.images;
      })
    );
  }

  deleteImage(id: string) {
    this.imageService.deleteImage(id);
  }


}
