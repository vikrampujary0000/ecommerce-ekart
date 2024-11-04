import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  registerUser(user: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }
  loginUser(user: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, user);
  }
  get userName() {
    let userData = localStorage.getItem("user");
    if (userData) {
      return JSON.parse(userData).name;
    }
    return null;
  }

  get isAdmin() {
    let userData = localStorage.getItem("user");
    if (userData) {
      return JSON.parse(userData).isAdmin;
    }
    return false;
  }

  get isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  }

  get email() {
    let userData = localStorage.getItem("user");
    if (userData) {
      return JSON.parse(userData).email;
    }
    return null;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}
