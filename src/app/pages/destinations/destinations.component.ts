import { Component } from '@angular/core';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent {
  images = [
    { id: 1, url: 'assets/images/photo1.jpg', title: 'Image 1' },
    { id: 2, url: 'assets/images/photo2.jpg', title: 'Image 2' },
    { id: 3, url: 'assets/images/photo3.jpg', title: 'Image 3' },
    { id: 4, url: 'assets/images/photo3.jpg', title: 'Image 3' },
    { id: 5, url: 'assets/images/photo3.jpg', title: 'Image 3' },
    { id: 6, url: 'assets/images/photo3.jpg', title: 'Image 3' },
    { id: 7, url: 'assets/images/photo3.jpg', title: 'Image 3' },
    { id: 8, url: 'assets/images/photo3.jpg', title: 'Image 3' },
    { id: 9, url: 'assets/images/photo3.jpg', title: 'Image 3' },
    { id: 10, url: 'assets/images/photo3.jpg', title: 'Image 3' },
  ]
  currentImageIndex: number = 0;

  get visibleImages() {
    const desiredImagesEachSide = 2;
    let startIndex = this.currentImageIndex - desiredImagesEachSide;
    let endIndex = this.currentImageIndex + desiredImagesEachSide;
    if (startIndex < 0) {
      endIndex = 3;
      startIndex = 0;
    } else if (endIndex > this.images.length - 1) {
      startIndex =this.images.length-4;
      endIndex = this.images.length - 1;
    }

    return this.images.slice(startIndex, endIndex + 1);
  }

  setCurrentImageIndex(index: number): void {
    this.currentImageIndex = index;
  }
}
