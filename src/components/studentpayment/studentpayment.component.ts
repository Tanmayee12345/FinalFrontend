import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth-service.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-studentpayment',
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
  templateUrl: './studentpayment.component.html',
  styleUrls: ['./studentpayment.component.scss'],
})
export class StudentpaymentComponent implements OnInit {
  studentId: string = ''; // Logged-in student's ID from AuthService
  feeData: any = null; // Fee details for the logged-in student
  paymentAmount: number = 0;
  isLoading: boolean = true;

  private apiBase = 'http://localhost:8091/api/student';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Retrieve the logged-in student's ID
    this.studentId = this.authService.getStudentId();
    if (this.studentId) {
      this.fetchFeeDetails();
    } else {
      this.snackBar.open('Student ID not found. Please log in again.', 'Close', { duration: 3000 });
    }
  }

  fetchFeeDetails() {
    const url = `${this.apiBase}/fee/${this.studentId}`;
    this.http.get(url).subscribe({
      next: (response) => {
        this.feeData = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching fee details:', error);
        this.snackBar.open('Error fetching your fee details. Please try again later.', 'Close', { duration: 3000 });
        this.isLoading = false;
      },
    });
  }

  payFee() {
    if (this.paymentAmount <= 0 || this.paymentAmount > this.feeData.remainingFee) {
      this.snackBar.open('Please enter a valid payment amount.', 'Close', { duration: 3000 });
      return;
    }
  
    const url = `${this.apiBase}/pay-fee`;
    const params = {
      studentId: this.studentId,
      amount: this.paymentAmount.toString(),
    };
  
    this.http.put(url, {}, { params, responseType: 'text' }).subscribe({
      next: (response: string) => {
        this.snackBar.open(response, 'Close', { duration: 3000 });
        this.fetchFeeDetails(); // Refresh fee details after payment
      },
      error: (error) => {
        console.error('Error making payment:', error);
        this.snackBar.open('Error making payment. Please try again later.', 'Close', { duration: 3000 });
      },
    });
  }
  
}
