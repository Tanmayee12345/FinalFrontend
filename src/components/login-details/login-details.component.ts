import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service.service';

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
  userType: string | null = null; // Default is null to show the image initially
  loginDetails: {
    id?: string;
    email?: string;
    username?: string;
    password?: string;
  } = {}; // Login details object

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  // Handle user type selection
  selectUserType(type: string) {
    this.userType = type;
    this.loginDetails = {}; // Reset login details for each type
  }

  // Handle login
  login() {
    let apiUrl = '';
    const requestBody: any = {};

    // Set API URL and request body based on user type
    if (this.userType === 'student') {
      apiUrl = 'http://localhost:8091/api/auth/login/student';
      requestBody.id = this.loginDetails.id;
      requestBody.email = this.loginDetails.email;
      requestBody.password = this.loginDetails.password;
    } else if (this.userType === 'teacher') {
      apiUrl = 'http://localhost:8091/api/auth/login/teacher';
      requestBody.id = this.loginDetails.id;
      requestBody.password = this.loginDetails.password;
    } else if (this.userType === 'parent') {
      apiUrl = 'http://localhost:8091/api/auth/login/parent';
      requestBody.id = this.loginDetails.id;
    } else if (this.userType === 'admin') {
      if (this.loginDetails.username === 'admin' && this.loginDetails.password === 'admin123') {
        alert('Admin login successful!');
        this.router.navigate(['/admin-dashboard']);
        return;
      } else {
        alert('Invalid admin credentials!');
        return;
      }
    }

    // Send the login request
    this.http.post(apiUrl, requestBody, { responseType: 'text' }).subscribe({
      next: () => {
        // Handle navigation after successful login
        if (this.userType === 'teacher') {
          alert('Teacher login successful');
          this.authService.setTeacherId(this.loginDetails.id || '');
          this.router.navigate(['/teacher-dashboard']);
        } else if (this.userType === 'student') {
          alert('Student login successful');
          this.authService.setStudentId(this.loginDetails.id || '');
          this.router.navigate(['/student-dashboard']);
        } else if (this.userType === 'parent') {
          alert('Parent login successful');
          this.authService.setStudentId(this.loginDetails.id || '');
          this.router.navigate(['/parent-dashboard']);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed! Please check your credentials.');
      },
    });
  }

  // Navigation methods for creating accounts
  navigateToStudentRegistration() {
    this.router.navigate(['/student-registration']);
  }

  navigateToTeacherRegistration() {
    this.router.navigate(['/teacher-registration']);
  }
}
