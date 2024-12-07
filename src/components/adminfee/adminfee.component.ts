
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-fee',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './adminfee.component.html',
  styleUrls: ['./adminfee.component.scss'],

  
})
export class AdminfeeComponent {
  feeStructure = {
    className: '',
    schoolFee: 0,
    tuitionFee: 0,
  };
  className: string = '';
  schoolFee: number = 0;
  tuitionFee: number = 0;

  private apiBase = 'http://localhost:8091/api/admin';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  addFeeStructure() {
    const url = `${this.apiBase}/add-fee`;

    this.http.post(url, this.feeStructure).subscribe({
      next: () => {
        this.snackBar.open('Fee structure added successfully!', 'Close', { duration: 3000 });
        this.resetFeeStructureForm();
      },
      error: () => {
        this.snackBar.open('Failed to add fee structure. Please try again.', 'Close', { duration: 3000 });
      },
    });
  }

  assignFeeToStudents() {
    const url = `${this.apiBase}/assign-fee/${this.className}`;

    const params = {
      schoolFee: this.schoolFee.toString(),
      tuitionFee: this.tuitionFee.toString(),
    };

    this.http.post(url, {}, { params ,responseType: 'text'}).subscribe({
      next: () => {
        this.snackBar.open('Fees assigned successfully to students!', 'Close', { duration: 3000 });
        this.resetAssignFeeForm();
      },
      error: () => {
        this.snackBar.open('Failed to assign fees. Please try again.', 'Close', { duration: 3000 });
      },
    });
  }

  private resetFeeStructureForm() {
    this.feeStructure = { className: '', schoolFee: 0, tuitionFee: 0 };
  }

  private resetAssignFeeForm() {
    this.className = '';
    this.schoolFee = 0;
    this.tuitionFee = 0;
  }
}


