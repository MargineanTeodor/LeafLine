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
  images !: any[];
  currentImageIndex: number = 0;
  isDiscountOnly: boolean = false;
  city: string = ""; 
  isLoggedIn = this.authService.isLoggedIn$;
  constructor(private authService: AuthService,private http: HttpClient,private router: Router) {}

  ngOnInit() {
    this.getUserLocation();
    this.isLoggedIn = this.authService.isLoggedIn$;
    this.fetchDestinations();
  }

  fetchDestinations() {
    this.http.get<{success: boolean, locations: any[]}>('http://localhost:5000/get_locations')
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.images = response.locations;
            console.log('Locations fetched successfully:', this.images);
          } else {
            console.error('Failed to fetch locations');
          }
        },
        error: (error) => console.error('Error fetching locations:', error)
      });
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
    const url = `http://localhost:5000/get_city_by_coords?lat=${lat}&lon=${lon}`;
    this.http.get<any>(url).subscribe({
      next: (response) => {
        console.log('City:', response.city);
        this.city = response.city; 
      },
      error: (error) => console.error('There was an error!', error)
    });
  }

  get visibleImages() {
    let filteredImages = this.isDiscountOnly ? this.images.filter(image => image.discount-1 >0 ) : this.images;
    const desiredImagesEachSide = 2;
    let startIndex = Math.max(this.currentImageIndex - desiredImagesEachSide, 0);
    let endIndex = Math.min(this.currentImageIndex + desiredImagesEachSide, filteredImages.length - 1);
    return filteredImages.slice(startIndex, endIndex + 1);
  }

  updateVisibleImages(): void {
    const filteredImages = this.isDiscountOnly ? this.images.filter(image => image.discount-1 > 0) : this.images;
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

  filterLocations() {
    if (!this.city) {
      alert('Please enter a city to search.');
      return;
    }
    this.http.get<{success: boolean, locations: any[]}>('http://localhost:5000/get_locations_filtred', { params: { location: this.city } })
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.images = response.locations;
            console.log('Filtered locations fetched successfully:', this.images);
          } else {
            console.error('No locations found with that city');
          }
        },
        error: (error) => {
          console.error('Error fetching locations:', error);
          alert('Error fetching locations: ' + error.message);
        }
      });
  }

}
