
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parent-communication',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './parent-communication.component.html',
  styleUrl: './parent-communication.component.scss'
})




export class ParentCommunicationComponent implements OnInit {
  students: any[] = [];
  selectedStudentId: string = '';
  messageBody: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    const apiUrl = 'http://localhost:8091/api/auth/students'; // Endpoint to fetch students
    this.http.get<any[]>(apiUrl).subscribe({
      next: (response) => {
        this.students = response;
      },
      error: (error) => {
        console.error('Error fetching students:', error);
      },
    });
  }

  sendMessage() {
    if (!this.selectedStudentId || !this.messageBody.trim()) {
      alert('Please select a student and enter a message.');
      return;
    }

    const apiUrl = `http://localhost:8091/api/messages/notify-parent/${this.selectedStudentId}`;
    const payload = { message: this.messageBody };

    this.http.post(apiUrl, payload, { responseType: 'text' }).subscribe({
      next: (response) => {
        alert(response);
        this.messageBody = ''; // Reset the message field
      },
      error: (error) => {
        console.error('Error sending message:', error);
        alert('Failed to send the message.');
      },
    });
  }
}
