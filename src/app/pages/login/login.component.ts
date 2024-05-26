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
      localStorage.setItem("username", this.loginData.username.toString());
      this.http.post<{success: boolean, role: string, message?: string}>('http://localhost:5000/login', this.loginData).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Login successful', response);
            console.log('User Role:', response.role);

            this.authService.login("token");
            if(response.role =="admin")
              this.router.navigate(['/adminPage']);
            else
              this.router.navigate(['']);
          } else {
            console.log('Login failed:', response.message);
          }
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
