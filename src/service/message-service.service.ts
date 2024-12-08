import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageServiceService {
  private apiBase = 'http://localhost:8091/api/messages';

  constructor(private http: HttpClient) {}

  sendMessage(message: any, options: { responseType: 'text' }): Observable<string> {
    return this.http.post(`${this.apiBase}/send`, message, options);
  }

  getPendingMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBase}/admin/pending`);
  }

  getAllMessages(): Observable<any[]> {
    // Method to fetch all messages for the admin
    return this.http.get<any[]>(`${this.apiBase}/admin/all`);
  }

  respondToMessage(payload: { messageId: string; adminResponse: string }): Observable<any> {
    // Method to send a response to a specific message
    const { messageId, adminResponse } = payload;
    return this.http.put(`${this.apiBase}/admin/respond/${messageId}`, null, {
      params: { adminResponse },
      responseType: 'text', // Set responseType here
    });
  }

  getMessagesForStudent(studentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBase}/student/${studentId}`);
  }
  deleteMessage(messageId: string): Observable<string> {
    return this.http.delete(`${this.apiBase}/messages/${messageId}`, { responseType: 'text' });
  }
}
