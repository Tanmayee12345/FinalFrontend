import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [HttpClientModule,MatTableModule,FormsModule,MatButtonModule,MatInputModule,MatFormFieldModule,MatCardModule,CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses: any[] = [];
  newCourse = { courseName: '', description: '' };
  displayedColumns: string[] = ['courseId', 'courseName', 'description', 'action'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.http.get('http://localhost:8091/api/courses').subscribe((data: any) => {
      this.courses = data;
    });
  }

  addCourse() {
    this.http.post('http://localhost:8091/api/courses', this.newCourse).subscribe(() => {
      alert('Course added successfully!');
      this.loadCourses();
      this.newCourse = { courseName: '', description: '' };
    });
  }

  deleteCourse(courseId: string) {
    this.http.delete(`http://localhost:8091/api/courses/${courseId}`).subscribe(() => {
      alert('Course deleted successfully!');
      this.loadCourses();
    });
  }

}
