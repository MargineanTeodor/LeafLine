import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/authorization/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  locations: any[] = [];  
  updateValue!: number;

  constructor(private http: HttpClient,private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.fetchLocations();
  }

  fetchLocations(): void {
    this.http.get<any>('http://localhost:5000/get_locations').subscribe({
      next: (response) => {
        if (response.success) {
          this.locations = response.locations;
        } else {
          alert('Failed to fetch locations');
        }
      },
      error: (error) => {
        console.error('Error fetching locations:', error);
        alert('Error fetching locations');
      }
    });
  }

  removeLocation(locationId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this location?');
    if (confirmDelete) {
        this.http.delete(`http://localhost:5000/remove_location?location_id=${locationId}`).subscribe({
            next: () => {
                alert('Location removed successfully');
                this.fetchLocations();
            },
            error: (error) => {
                console.error('Failed to remove location', error);
                alert(`Failed to remove location: ${error.error?.message || 'Unknown error'}`);
            }
        });
    }  
  }
  getGraphs(locationId: number): void {
    this.router.navigate(['/graphs']);
    localStorage.setItem("locationId", locationId.toString() );
  }
  changePrice(location: any): void {
    const newPrice = this.updateValue;
    if (!isNaN(newPrice)) {
      const payload = {
        location_id: location,
        new_price: newPrice
      };

      this.http.post('http://localhost:5000/change_price', payload)
        .subscribe({
          next: (response) => {
            console.log('Price updated successfully:', response);
            this.fetchLocations();
          },
          error: (error) => {
            console.error('Failed to update price:', error);
            alert(`Failed to update price: ${error.error?.message || 'Unknown error'}`);
          }
        });
    } else {
      alert('Invalid price entered. Please enter a valid number.');
    }
  }

  changeSlots(location: any): void {
    const new_slots = this.updateValue;
    if (!isNaN(new_slots)) {
      const payload = {
        location_id: location,
        new_slots: new_slots
      };

      this.http.post('http://localhost:5000/change_slots', payload)
        .subscribe({
          next: (response) => {
            console.log('Slots updated successfully:', response);
            this.fetchLocations();
          },
          error: (error) => {
            console.error('Failed to update slots:', error);
            alert(`Failed to update slots: ${error.error?.message || 'Unknown error'}`);
          }
        });
    } else {
      alert('Invalid number of slots entered. Please enter a valid number.');
    }
  }

  changeDiscount(location: any): void {
    const new_discount = this.updateValue;
    if (!isNaN(new_discount)) {
      const payload = {
        location_id: location,
        new_discount: new_discount
      };
      this.http.post('http://localhost:5000/change_discount', payload)
        .subscribe({
          next: (response) => {
            console.log('Discount updated successfully:', response);
            this.fetchLocations();
          },
          error: (error) => {
            console.error('Failed to update discount:', error);
            alert(`Failed to update discount: ${error.error?.message || 'Unknown error'}`);
          }
        });
    } else {
      alert('Invalid discount entered. Please enter a valid number.');
    }
  }

  logoutUser() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
