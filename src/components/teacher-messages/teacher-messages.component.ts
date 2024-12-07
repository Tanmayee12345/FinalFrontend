import { Component, OnInit } from '@angular/core';
import { MessageServiceTeacherService } from '../../service/message-service-teacher.service';
import { AuthService } from '../../service/auth-service.service';
import { MatCard, MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-teacher-messages',
  standalone: true,
  imports: [MatCard,CommonModule,FormsModule,MatOptionModule,MatCardModule],
  templateUrl: './teacher-messages.component.html',
  styleUrl: './teacher-messages.component.scss'
})





export class TeacherMessagesComponent implements OnInit {
  teacherId: string = '';
  messages: any[] = [];

  constructor(private messageService: MessageServiceTeacherService, private authService: AuthService) {}

  ngOnInit(): void {
    this.teacherId = this.authService.getTeacherId();
    if (this.teacherId) {
      this.loadMessages();
    } else {
      alert('Teacher ID not found. Please log in again.');
    }
  }

  loadMessages() {
    this.messageService.getMessagesForTeacher(this.teacherId).subscribe({
      next: (response) => {
        this.messages = response;
      },
      error: (error) => {
        console.error('Error loading messages:', error);
        alert('Failed to load messages.');
      },
    });
  }

  respondToMessage(message: any, responseText: string) {
    if (!responseText.trim()) {
      alert('Response cannot be empty.');
      return;
    }
  
    // Use the message ID and response text to send the response
    this.messageService.respondToStudent(message.id, responseText).subscribe({
      next: () => {
        alert('Response sent successfully!');
        // Update the local message status and response
        message.response = responseText;
        message.status = true;
      },
      error: (error) => {
        console.error('Error sending response:', error);
        alert('Failed to send response. Please try again.');
      },
    });
  }
  
}

