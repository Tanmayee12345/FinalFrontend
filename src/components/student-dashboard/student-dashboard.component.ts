import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

type QuestionCategory = 'Admissions' | 'Examinations' | 'Attendance' | 'Fees';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, RouterLink,FormsModule,CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent implements OnInit {
  username: string = '';
  selectedCategory: QuestionCategory = 'Admissions';

  questions: Record<QuestionCategory, { question: string; answer: string; isOpen: boolean }[]> = {
    'Admissions': [
      { question: 'What documents are required for student admission?', answer: 'You need to provide the student\'s birth certificate, previous school leaving certificate, and address proof.', isOpen: false },
      { question: 'Is there an online application process available?', answer: 'Yes, you can apply online through the school\'s official website.', isOpen: false },
      { question: 'What is the admission fee structure?', answer: 'The admission fee structure is available on the school\'s website or can be obtained from the office.', isOpen: false },
    ],
    'Examinations': [
      { question: 'How can I check the exam schedule?', answer: 'The exam schedule is uploaded on the school portal under the “Examinations” section.', isOpen: false },
      { question: 'What is the process for applying for re-evaluation?', answer: 'Re-evaluation forms are available in the office or can be downloaded from the portal. Submit the filled form along with the required fee.', isOpen: false },
    ],
    'Attendance': [
      { question: 'How can I check my child’s attendance?', answer: 'Attendance details are available on the parent portal. You can also receive daily updates via the school app.', isOpen: false },
      { question: 'What is the minimum attendance required for examinations?', answer: 'Students must have at least 75% attendance to be eligible for examinations.', isOpen: false },
    ],
    'Fees': [
      { question: 'What are the modes of fee payment?', answer: 'Fees can be paid online via the school portal, through net banking, or in person at the school office.', isOpen: false },
      { question: 'Is there a late fee penalty for delayed payments?', answer: 'Yes, a late fee penalty is applied for payments made after the due date. Check the fee policy for details.', isOpen: false },
    ]
  };
  features = [
    {
      img: 'https://media.istockphoto.com/id/1371803904/vector/attendance-icon-students-in-classroom.jpg?s=612x612&w=0&k=20&c=gxaoB-rzMaDhbIljFG8HmV1fT2Ylv7xgWrf7fYY5fE0=',
      text: 'Manage student information, including grades, attendance, and contact info.',
    },
    {
      img :'https://www.shutterstock.com/image-vector/class-timetable-icon-vector-logotype-600nw-1899981805.jpg',
      text: 'Track teacher details, subjects, and class schedules with ease.',
    },
    {
      img:'https://thumbs.dreamstime.com/b/book-grade-message-high-academic-performance-school-university-studied-pixel-perfect-vector-icon-editable-stroke-321271851.jpg',
      text: 'Monitor student grades and generate reports based on academic performance.',
    },
    {
      img: 'https://static.vecteezy.com/system/resources/thumbnails/022/608/800/small_2x/tuition-icon-with-linear-style-isolated-on-white-background-vector.jpg',
      text: 'Keep track of fee payments and generate fee-related reports for students.',
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.authService.getStudentId(); // Replace with logic to fetch logged-in student username
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/logindetails']);
  }

  // Set selected category
  selectCategory(category: QuestionCategory) {
    this.selectedCategory = category;
  }

  // Toggle answer visibility
  toggleAnswer(question: { question: string; answer: string; isOpen: boolean }) {
    question.isOpen = !question.isOpen;
  }

  // Get categories dynamically
  get categories(): QuestionCategory[] {
    return Object.keys(this.questions) as QuestionCategory[];
  }
}
