import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,CommonModule
  ],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  student = {
    name: '',
    password:'',
    dateOfBirth: '',
    email: '',
    address: '',
    studentClass: '',
    parentPhoneNumber:''
  };

  registeredStudentId: string | null = null; // To store the registered student ID

  constructor(private http: HttpClient,private router: Router) {}

  registerStudent() {
    this.http.post('http://localhost:8091/api/auth/signup/student', this.student).subscribe(
      (response: any) => {
        this.registeredStudentId = response.id; // Assuming the API returns the ID in the response
        alert('Student registered successfully!');
      },
      (error) => {
        alert('Error occurred during registration!');
      }
    );
  }
  navigateToLogin() {
    this.router.navigate(['/logindetails']); // Adjust the route based on your app's configuration
  }
}
