import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from '../../service/message-service.service';
import { AuthService } from '../../service/auth-service.service';
import { MatCard, MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-student-messages',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatCardModule],
  templateUrl: './student-messages.component.html',
  styleUrls: ['./student-messages.component.scss'],
})
export class StudentMessagesComponent implements OnInit {
  studentId: string = '';
  messages: any[] = [];
  newMessage: string = '';

  constructor(private messageService: MessageServiceService, private authService: AuthService) {}

  ngOnInit(): void {
    this.studentId = this.authService.getStudentId();
    if (this.studentId) {
      this.loadMessages();
    } else {
      alert('Student ID not found. Please log in again.');
    }
  }

  loadMessages() {
    this.messageService.getMessagesForStudent(this.studentId).subscribe({
      next: (response) => {
        this.messages = response;
      },
      error: (error) => {
        console.error('Error loading messages:', error);
        alert('Failed to load messages.');
      },
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) {
      alert('Message cannot be empty.');
      return;
    }

    const message = {
      studentId: this.studentId,
      studentName: 'Your Name', // Replace with actual student name if available
      message: this.newMessage.trim(),
    };

    this.messageService.sendMessage(message, { responseType: 'text' }).subscribe({
      next: (response) => {
        alert(response); // Display the response text from the backend
        this.newMessage = '';
        this.loadMessages();
      },
      error: (error) => {
        console.error('Error sending message:', error);
        alert('Failed to send message.');
      },
    });
  }
  deleteMessage(messageId: string) {
    if (confirm('Are you sure you want to delete this message?')) {
      this.messageService.deleteMessage(messageId).subscribe({
        next: (response) => {
          alert(response); // Show backend response
          this.loadMessages(); // Reload messages after deletion
        },
        error: (error) => {
          console.error('Error deleting message:', error);
          alert('Failed to delete the message.');
        },
      });
    }
  }
  
}
