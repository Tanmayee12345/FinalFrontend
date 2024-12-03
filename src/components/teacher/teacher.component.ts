import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule, } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [HttpClientModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,FormsModule,CommonModule],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.scss'
})
export class TeacherComponent {
  teacher = {
    name: '',
    courseName: '',
    contactDetails: '',
  };

  constructor(private http: HttpClient) {}
  registeredTeachertId: string | null = null; // To store the registered student ID

  registerTeacher() {
    this.http.post('http://localhost:8091/api/auth/signup/teacher', this.teacher).subscribe(
      (response:any) => {
        this.registeredTeachertId = response.id; // Assuming the API returns the ID in the response
        alert('Teacher registered successfully!');
      },
      (error) => {
        alert('Error occurred during registration!');
      }
    );
  }
}
