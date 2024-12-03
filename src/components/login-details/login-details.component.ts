import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-details',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './login-details.component.html',
  styleUrls: ['./login-details.component.scss'],
})
export class LoginDetailsComponent {
  userType: string = 'student'; // Default user type
  loginDetails: { id?: string; email?: string; username?: string; password?: string } = {}; // Extended for admin

  constructor(private http: HttpClient, private router: Router) {}

  // Handle user type selection
  selectUserType(type: string) {
    this.userType = type;
    this.loginDetails = {}; // Reset login details for each type
  }

  // Handle login
  login() {
    let apiUrl = '';
    const requestBody: any = {};

    // Determine API endpoint and request body based on user type
    if (this.userType === 'student') {
      apiUrl = 'http://localhost:8091/api/auth/login/student';
      requestBody.id = this.loginDetails.id;
      requestBody.email = this.loginDetails.email;
    } else if (this.userType === 'teacher') {
      apiUrl = 'http://localhost:8091/api/auth/login/teacher';
      requestBody.id = this.loginDetails.id;
    } else if (this.userType === 'admin') {
      // Directly handle admin login without backend
      if (this.loginDetails.username === 'admin' && this.loginDetails.password === 'admin123') {
        alert('Admin login successful!');
        this.router.navigate(['/admin-dashboard']);
        return; // Exit function as admin login does not involve an API call
      } else {
        alert('Invalid admin credentials!');
        return; // Exit function on invalid credentials
      }
    }

    // For student and teacher, send login request to backend
    this.http.post(apiUrl, requestBody, { responseType: 'text' }).subscribe({
      next: (response: string) => {
        alert(`${this.userType.charAt(0).toUpperCase() + this.userType.slice(1)} login successful!`);
        const navigateTo =
          this.userType === 'student'
            ? '/student-dashboard'
            : this.userType === 'teacher'
            ? '/teacher-dashboard'
            : '';
        if (navigateTo) {
          this.router.navigate([navigateTo]);
        }
      },
      error: () => {
        alert('Login failed! Please check your credentials.');
      },
    });
  }
  navigateToStudentRegistration() {
    this.router.navigate(['/student']);
  }

  // Navigate to teacher registration
  navigateToTeacherRegistration() {
    this.router.navigate(['/teacher']);
  }
}
