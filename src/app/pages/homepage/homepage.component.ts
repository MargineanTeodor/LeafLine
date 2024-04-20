import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/authorization/auth.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  isLoggedIn = this.authService.isLoggedIn$;

  constructor(private authService: AuthService) {}

  ngOnInit(
  ) {
    this.isLoggedIn = this.authService.isLoggedIn$;
  }

  logoutUser() {
    this.authService.logout();
    location.reload();
  }
}

