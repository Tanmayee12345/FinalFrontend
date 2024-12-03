import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  studentDataSource = new MatTableDataSource<any>();
  teacherDataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['id', 'name', 'email', 'action'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadInactiveStudents();
    this.loadInactiveTeachers();
  }

  loadInactiveStudents() {
    this.http.get<any[]>('http://localhost:8091/api/admin/students/inactive').subscribe(
      (response) => {
        this.studentDataSource.data = response;
      },
      (error) => {
        alert('Error loading inactive students!');
      }
    );
  }

  loadInactiveTeachers() {
    this.http.get<any[]>('http://localhost:8091/api/admin/teachers/inactive').subscribe(
      (response) => {
        this.teacherDataSource.data = response;
      },
      (error) => {
        alert('Error loading inactive teachers!');
      }
    );
  }

  activateStudent(id: number) {
    this.http.put(`http://localhost:8091/api/admin/activate/student/${id}`, {}).subscribe(
      () => {
        alert('Student activated successfully!');
        this.loadInactiveStudents();
      },
      (error) => {
        alert('Error activating student!');
      }
    );
  }

  activateTeacher(id: number) {
    this.http.put(`http://localhost:8091/api/admin/activate/teacher/${id}`, {}).subscribe(
      () => {
        alert('Teacher activated successfully!');
        this.loadInactiveTeachers();
      },
      (error) => {
        alert('Error activating teacher!');
      }
    );
  }
}
