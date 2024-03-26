import { Component } from '@angular/core';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent {
  images = [
    { id: 1, url: 'assets/images/photo1.jpg', title: 'Image 1',discount: true },
    { id: 2, url: 'assets/images/photo2.jpg', title: 'Image 2',discount: true },
    { id: 3, url: 'assets/images/photo3.jpg', title: 'Image 3',discount: false },
    { id: 4, url: 'assets/images/photo3.jpg', title: 'Image 3',discount: false },
    { id: 5, url: 'assets/images/photo3.jpg', title: 'Image 3',discount: false },
    { id: 6, url: 'assets/images/photo3.jpg', title: 'Image 3',discount: false},
    { id: 7, url: 'assets/images/photo3.jpg', title: 'Image 3',discount: false },
    { id: 8, url: 'assets/images/photo3.jpg', title: 'Image 3',discount: false },
    { id: 9, url: 'assets/images/photo3.jpg', title: 'Image 3',discount: false },
    { id: 10, url: 'assets/images/photo3.jpg', title: 'Image 3',discount: false },
  ]
  currentImageIndex: number = 0;
  isDiscountOnly: boolean = false;
  get visibleImages() {
    let filteredImages = this.isDiscountOnly ? this.images.filter(image => image.discount) : this.images;
    
    const desiredImagesEachSide = 2;
    let startIndex = Math.max(this.currentImageIndex - desiredImagesEachSide, 0);
    let endIndex = Math.min(this.currentImageIndex + desiredImagesEachSide, filteredImages.length - 1);
  
    return filteredImages.slice(startIndex, endIndex + 1);
  }

  updateVisibleImages(): void {
    const filteredImages = this.isDiscountOnly ? this.images.filter(image => image.discount) : this.images;
    
    if (!filteredImages.map(image => image.id).includes(this.images[this.currentImageIndex].id)) {
      this.currentImageIndex = 0; // Reset to the first image if the current is not in the filtered list
    }
  }
  
  setCurrentImageIndex(index: number): void {
    this.currentImageIndex = index;
  }
}
