import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent {
  classIds: any[] = [];
  selectedClassId: string = '';
  timetable: any[] | null = null;

  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  timeSlots: any[] = [
    { startTime: '09:00', endTime: '09:45' },
    { startTime: '10:00', endTime: '10:45' },
    { startTime: '11:00', endTime: '11:45' },
    { startTime: '12:00', endTime: '12:45' },
    { startTime: '13:00', endTime: '13:45' },
    { startTime: '14:00', endTime: '14:45' },
    { startTime: '15:00', endTime: '15:45' },
    { startTime: '16:00', endTime: '16:45' },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchClassIds();
  }

  fetchClassIds() {
    this.http.get<any[]>('http://localhost:8091/api/schedule/classes').subscribe(
      (response) => {
        this.classIds = response;
      },
      (error) => {
        alert('Error fetching class IDs!');
      }
    );
  }

  fetchTimetable() {
    if (!this.selectedClassId) {
      alert('Please select a class ID!');
      return;
    }

    this.http
      .get<any[]>(`http://localhost:8091/api/timetable/class/${this.selectedClassId}`)
      .subscribe(
        (response) => {
          console.log('Timetable Response:', response);
          this.timetable = response;
        },
        (error) => {
          alert('Error fetching timetable!');
          this.timetable = null;
        }
      );
  }

  getSlotData(day: string, startTime: string, endTime: string) {
    return this.timetable?.find(
      (slot) =>
        slot.day === day &&
        slot.startTime === startTime &&
        slot.endTime === endTime
    );
  }
}
