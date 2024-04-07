import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.validateEmailContainsAt.bind(this)]],
      username: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(19)]],
      password: ['', [Validators.required]],
      repeatPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  validateEmailContainsAt(control: FormControl): { [key: string]: boolean } | null {
    const email = control.value;
    if (email && !email.includes('@')) {
      return { emailInvalid: true };
    }
    return null;
  }

  passwordMatchValidator(fg: FormGroup): { [key: string]: boolean } | null {
    const password = fg.get('password')?.value ?? '';
    const repeatPassword = fg.get('repeatPassword')?.value ?? '';
    if (password !== repeatPassword) {
      return { mismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const submissionData = { ...this.registerForm.value };
      delete submissionData.repeatPassword;
      console.log(submissionData)
      this.http.post('http://localhost:5000/register', submissionData).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error);
          console.error('Registration failed', error);
          alert('Registration failed: ' + (error.error?.message || 'Unknown error'));
        }
      });
    } else {
      this.showValidationErrors();
    }
  }

  showValidationErrors(): void {
    let errorMessage = '';
    const controls = this.registerForm.controls;
    for (const name in controls) {
      if (controls[name].errors) {
        for (const error in controls[name].errors) {
          switch (error) {
            case 'required':
              errorMessage += `${name} is required.\n`;
              break;
            case 'email':
              errorMessage += `${name} must be a valid email address.\n`;
              break;
            case 'emailInvalid':
              errorMessage += `Email must contain @.\n`;
              break;
            case 'min':
              errorMessage += `${name} must be over 18.\n`;
              break;
            case 'mismatch':
              errorMessage += `Passwords do not match.\n`;
              break;
          }
        }
      }
    }

    if (errorMessage) {
      alert(errorMessage);
    }
  }
}
