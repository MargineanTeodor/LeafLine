import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {
  locationForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,) {}

  ngOnInit(): void {
    this.locationForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      loc_type: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      nr_slots: [null, Validators.required],
      discount: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.locationForm.valid) {
      console.log(this.locationForm.value)
      this.http.post('http://localhost:5000/add_location', this.locationForm.value)
        .subscribe({
          next: (response) => {
            console.log('Location added successfully', response);
            this.router.navigate(['/adminPage']);
          },
          error: (error) => {
            console.error('Failed to add location', error);
          }
        });
    } else {
      console.error('Form is not valid');
    }
  }
}
