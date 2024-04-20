import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authorization/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { username: '', password: '' };

  constructor(private http: HttpClient, private router: Router,private authService: AuthService) {}

  loginUser(): void {
    if (this.isValidLoginData(this.loginData)) {
      console.log(this.loginData); 

      this.http.post('http://localhost:5000/login', this.loginData).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.authService.login("tokenToBeAdded");
          this.router.navigate(['']); 
        },
        error: (error) => {
          console.log(error);
          console.error('Login failed', error);
          alert('Login failed: ' + (error.error?.message || 'Unknown error'));
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  isValidLoginData(data: any): boolean {
    return data.username && data.password;
  }

  goToRegister(): void {
    this.router.navigate(['/register']); 
  }
}
