import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from '../../service/message-service.service';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-messages',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    CommonModule,
    MatSnackBarModule,
  ],
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.scss'],
})
export class AdminMessagesComponent implements OnInit {
  messages: any[] = [];
  private studentApiBase = 'http://localhost:8091/api/students'; // API base for student data

  constructor(
    private messageService: MessageServiceService,
    private snackBar: MatSnackBar,
    private http: HttpClient // Inject HttpClient to fetch student details
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getPendingMessages().subscribe({
      next: (response) => {
        this.messages = response.map((msg: any) => ({
          ...msg,
          responseText: '', // Temporary field for admin response
          studentName: 'Loading...', // Placeholder for student name
          className: 'Loading...', // Placeholder for class name
        }));
        this.fetchStudentDetails(); // Fetch student names and class names after loading messages
      },
      error: (error) => {
        console.error('Error loading messages:', error);
        this.snackBar.open(
          'Failed to load messages. Please try again later.',
          'Close',
          { duration: 3000 }
        );
      },
    });
  }

  fetchStudentDetails() {
    const studentIds = this.messages.map((msg) => msg.studentId);
    const uniqueStudentIds = [...new Set(studentIds)]; // Remove duplicates

    uniqueStudentIds.forEach((studentId) => {
      this.http.get<any>(`${this.studentApiBase}/profile/${studentId}`).subscribe({
        next: (student) => {
          // Update the studentName and className in messages
          this.messages.forEach((msg) => {
            if (msg.studentId === student.id) {
              msg.studentName = student.name;
              msg.className = student.studentClass || 'Unknown Class'; // Use a fallback if className is unavailable
            }
          });
        },
        error: (error) => {
          console.error(`Error fetching student data for ID ${studentId}:`, error);
        },
      });
    });
  }

  respondToMessage(message: any) {
    if (!message.responseText.trim()) {
      this.snackBar.open('Response cannot be empty.', 'Close', {
        duration: 3000,
      });
      return;
    }

    const responsePayload = {
      messageId: message.id,
      adminResponse: message.responseText.trim(),
    };

    this.messageService.respondToMessage(responsePayload).subscribe({
      next: () => {
        this.snackBar.open('Response sent successfully!', 'Close', {
          duration: 3000,
        });
        message.adminResponse = message.responseText;
        message.status = true;
        message.responseText = ''; // Clear the textarea after response
      },
      error: (error) => {
        console.error('Error sending response:', error);
        this.snackBar.open(
          'Failed to send response. Please try again later.',
          'Close',
          { duration: 3000 }
        );
      },
    });
  }
}
