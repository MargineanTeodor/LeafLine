import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  checkTokenValidity(): boolean {
    
    const token = localStorage.getItem('token');
    console.log(token);
    const expiration = localStorage.getItem('token_expiration');
    const now = new Date();
    if (!token || !expiration) {
      return false;
    }
    return new Date(expiration) > now;
  }
  login(token: string): void {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + 60 * 60 * 1000); //o ora 
    localStorage.setItem('token', token);
    localStorage.setItem('token_expiration', expirationDate.toISOString());
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration');
  }

  get isLoggedIn$():boolean {
    
    return this.checkTokenValidity();
  }
}
