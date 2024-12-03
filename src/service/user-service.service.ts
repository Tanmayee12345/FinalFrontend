import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8091/api/auth'; // Backend URL

  constructor(private http: HttpClient) {}

  // Register user
  register(user: any): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, user);
  }

  // Login user
  login(user: any): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, user);
  }
}

