import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/authorization/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {
  images = [
    { id: 1, url: 'assets/images/photo1.jpg', title: 'Image 1', discount: true },
    { id: 2, url: 'assets/images/photo2.jpg', title: 'Image 2', discount: true },
    { id: 3, url: 'assets/images/photo3.jpg', title: 'Image 3', discount: false },
    { id: 4, url: 'assets/images/photo3.jpg', title: 'Image 3', discount: false },
    { id: 5, url: 'assets/images/photo3.jpg', title: 'Image 3', discount: false },
    { id: 6, url: 'assets/images/photo3.jpg', title: 'Image 3', discount: false },
    { id: 7, url: 'assets/images/photo3.jpg', title: 'Image 3', discount: false },
    { id: 8, url: 'assets/images/photo3.jpg', title: 'Image 3', discount: false },
    { id: 9, url: 'assets/images/photo3.jpg', title: 'Image 3', discount: false },
    { id: 10, url: 'assets/images/photo3.jpg', title: 'Image 3', discount: false },
  ];
  currentImageIndex: number = 0;
  isDiscountOnly: boolean = false;
  city: string = ""; 
  isLoggedIn = this.authService.isLoggedIn$;
  constructor(private authService: AuthService,private http: HttpClient,private router: Router) {}

  ngOnInit() {
    this.getUserLocation();
    this.isLoggedIn = this.authService.isLoggedIn$;
    console.log(this.isLoggedIn)
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        this.saveLocation(latitude, longitude);
        this.fetchCityName(latitude, longitude);
      }, (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  saveLocation(lat: number, lon: number) {
    localStorage.setItem('userLocation', JSON.stringify({ latitude: lat, longitude: lon }));
  }

  fetchCityName(lat: number, lon: number) {
    const url = `http://localhost:5000/get_city_by_coords?lat=${lat}&lon=${lon}`; // Adjust this URL to your Flask endpoint
    this.http.get<any>(url).subscribe({
      next: (response) => {
        console.log('City:', response.city);
        this.city = response.city; // Update the city name
      },
      error: (error) => console.error('There was an error!', error)
    });
  }

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
      this.currentImageIndex = 0; 
    }
  }
  
  setCurrentImageIndex(index: number): void {
    this.currentImageIndex = index;
  }

  logoutUser() {
    this.authService.logout();
    location.reload();
  }
}
