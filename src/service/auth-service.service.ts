import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TEACHER_ID_KEY = 'teacherId';
  private readonly STUDENT_ID_KEY = 'studentId';

  // Set and Get Teacher ID
  setTeacherId(id: string): void {
    localStorage.setItem(this.TEACHER_ID_KEY, id); // Persist teacherId in localStorage
  }

  getTeacherId(): string {
    return localStorage.getItem(this.TEACHER_ID_KEY) || ''; // Retrieve teacherId from localStorage
  }

  // Set and Get Student ID
  setStudentId(id: string): void {
    localStorage.setItem(this.STUDENT_ID_KEY, id); // Persist studentId in localStorage
  }

  getStudentId(): string {
    return localStorage.getItem(this.STUDENT_ID_KEY) || ''; // Retrieve studentId from localStorage
  }

  // Logout and clear stored data
  logout(): void {
    localStorage.removeItem(this.TEACHER_ID_KEY);
    localStorage.removeItem(this.STUDENT_ID_KEY);
  }

  // Check if a teacher or student is logged in
  isTeacherLoggedIn(): boolean {
    return this.getTeacherId() !== '';
  }

  isStudentLoggedIn(): boolean {
    return this.getStudentId() !== '';
  }
}
