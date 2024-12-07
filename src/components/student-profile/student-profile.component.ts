import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth-service.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [MatSnackBarModule,CommonModule,MatCard,FormsModule,MatInputModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.scss'
})



export class StudentProfileComponent implements OnInit {
  studentId: string = ''; // Logged-in student's ID
  profileData: any = null; // Holds profile information
  password: string='';
  newDob: string = ''; // Holds the updated date of birth
  isLoading: boolean = true;

  private apiBase = 'http://localhost:8091/api/students';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.studentId = this.authService.getStudentId(); // Get the student ID from AuthService
    if (this.studentId) {
      this.fetchProfile();
    } else {
      this.snackBar.open('Student ID not found. Please log in again.', 'Close', { duration: 3000 });
    }
  }

  fetchProfile() {
    const url = `${this.apiBase}/profile/${this.studentId}`;
    this.http.get(url).subscribe({
      next: (response) => {
        this.profileData = response;
        this.newDob = this.profileData.dateOfBirth;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
        this.snackBar.open('Error fetching profile. Please try again later.', 'Close', { duration: 3000 });
        this.isLoading = false;
      },
    });
  }

  updateDob() {
    const url = `${this.apiBase}/profile/${this.studentId}/update-dob`;
    const params = { dateOfBirth: this.newDob };

    this.http.put(url, {}, { params,responseType: 'text' }).subscribe({
      next: () => {
        this.snackBar.open('Date of birth updated successfully!', 'Close', { duration: 3000 });
        this.fetchProfile(); // Refresh profile data
      },
      error: (error) => {
        console.error('Error updating date of birth:', error);
        this.snackBar.open('Error updating date of birth. Please try again later.', 'Close', { duration: 3000 });
      },
    });
  }
  updatePassword(){
    
  }
}

