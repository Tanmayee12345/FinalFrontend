


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private apiBaseUrl = 'http://localhost:8091/api/admin'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Get all active teachers
  getActiveTeachers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/teachers/active`);
  }

  deleteTeacherById(teacherId: string): Observable<string> {
    return this.http.delete(`${this.apiBaseUrl}/teachers/deleteTeacher/${teacherId}`, { responseType: 'text' });
  }
}

