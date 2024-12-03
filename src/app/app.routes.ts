import { Routes } from '@angular/router';
import { RegisterComponentComponent } from '../components/register-component/register-component.component';
import { LoginComponentComponent } from '../components/login-component/login-component.component';
import { StudentComponent } from '../components/student/student.component';
import { TeacherComponent } from '../components/teacher/teacher.component';
import { AdminComponent } from '../components/admin/admin.component';
import { LoginDetailsComponent } from '../components/login-details/login-details.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { TimetableComponent } from '../components/timetable/timetable.component';
import { StudentDashboardComponent } from '../student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from '../teacher-dashboard/teacher-dashboard.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'logindetails', pathMatch: 'full' },
  { path: 'register', component: RegisterComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  {path:'student', component:StudentComponent},
  {path:'teacher',component:TeacherComponent},
  {path:'admin', component:AdminComponent},
  {path:"logindetails",component:LoginDetailsComponent},
  {path:"courses",component:CoursesComponent},
  {path:"timetable",component:TimetableComponent},
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'teacher-dashboard', component: TeacherDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
 
   // Default route
];
