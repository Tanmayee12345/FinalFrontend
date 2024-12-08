import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root',
})
export class MessageServiceTeacherService {
  private apiBase = 'http://localhost:8091/api/messages';

  constructor(private http: HttpClient) {}

  getTeachersForStudent(studentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBase}/${studentId}/teachers`);
  }

  getMessagesForStudent(studentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBase}/student/${studentId}/messages`);
  }

  sendMessageToTeacher(studentId: string, teacherId: string, message: any): Observable<any> {
    return this.http.post(`${this.apiBase}/student/${studentId}/message/${teacherId}`, message, { responseType: 'text' });
  }
  

  getMessagesForTeacher(teacherId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBase}/teacher/${teacherId}/messages`);
  }

  respondToStudent(messageId: string, responseText: string): Observable<any> {
    const apiUrl = `${this.apiBase}/teacher/respond/${messageId}`;
    const payload = { response: responseText.trim() };
  
    return this.http.put(apiUrl, payload, { responseType: 'text' });
  }
  deleteMessage(messageId: string): Observable<string> {
    return this.http.delete(`${this.apiBase}/${messageId}`, { responseType: 'text' });
  }
  
}

