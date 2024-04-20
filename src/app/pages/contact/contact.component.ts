import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/authorization/auth.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
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
