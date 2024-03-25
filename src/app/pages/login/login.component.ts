import { Component } from '@angular/core';
import { AuthService } from '../../service/authorization/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '123';
  password: string = '123'; 
  constructor(private authService: AuthService, private router: Router) {}

  loginUser() {
    this.authService.login(this.username);
    this.router.navigate(['/']);
  }

  goToRegister() {
    this.router.navigate(['/register']); 
  }
}
