import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/authorization/auth.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loginStatus) => {
      this.isLoggedIn = loginStatus;
    });
    this.authService.currentUsername.subscribe((name) => {
      this.username = name;
    });
  }

  logoutUser() {
    this.authService.logout();
  }
}

