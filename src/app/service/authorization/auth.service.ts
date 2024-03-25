import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string>('');

  public isLoggedIn = this.loggedIn.asObservable();
  public currentUsername = this.username.asObservable();

  constructor() {}

  login(user: string) {
    this.loggedIn.next(true);
    this.username.next(user);
  }

  logout() {
    this.loggedIn.next(false);
    this.username.next('');
  }
}
