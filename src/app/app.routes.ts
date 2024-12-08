import { Routes } from '@angular/router';
import { RegisterComponentComponent } from '../components/register-component/register-component.component';
import { LoginComponentComponent } from '../components/login-component/login-component.component';
import { StudentComponent } from '../components/student/student.component';
import { TeacherComponent } from '../components/teacher/teacher.component';
import { AdminComponent } from '../components/admin/admin.component';
import { LoginDetailsComponent } from '../components/login-details/login-details.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { TimetableComponent } from '../components/timetable/timetable.component';
import { StudentDashboardComponent } from '../components/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from '../components/teacher-dashboard/teacher-dashboard.component';
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';
import { StudentTimetableComponent } from '../components/student-timetable/student-timetable.component';
import { TeacherClassesStudentsComponent } from '../components/teacher-classes-students/teacher-classes-students.component';
import { TeacherClassesComponent } from '../components/teacher-classes/teacher-classes.component';
import { MarksviewComponent } from '../components/marksview/marksview.component';
import { AdminfeeComponent } from '../components/adminfee/adminfee.component';
import { StudentpaymentComponent } from '../components/studentpayment/studentpayment.component';
import { StudentProfileComponent } from '../components/student-profile/student-profile.component';
import { StudentMessagesComponent } from '../components/student-messages/student-messages.component';
import { AdminMessagesComponent } from '../components/admin-messages/admin-messages.component';
import { StudentMessagesToTeacherComponent } from '../components/student-messages-to-teacher/student-messages-to-teacher.component';
import { TeacherMessagesComponent } from '../components/teacher-messages/teacher-messages.component';
import { TeacherAttendenceComponent } from '../components/teacher-attendence/teacher-attendence.component';
import { StudentAttendenceComponent } from '../components/student-attendence/student-attendence.component';
import { StudentleaverequestComponent } from '../components/studentleaverequest/studentleaverequest.component';
import { StudentTeacherrequestComponent } from '../components/student-teacherrequest/student-teacherrequest.component';
import { ParentCommunicationComponent } from '../components/parent-communication/parent-communication.component';
import { ViewExamScheduleComponent } from '../components/view-exam-schedule/view-exam-schedule.component';
import { ScheduleExamComponent } from '../components/schedule-exam/schedule-exam.component';
import { AdminattendencereportComponent } from '../components/adminattendencereport/adminattendencereport.component';
import { StudentattendencereportComponent } from '../components/studentattendencereport/studentattendencereport.component';
import { AdmindeleteteacherComponent } from '../components/admindeleteteacher/admindeleteteacher.component';
import { ParentDashboardComponent } from '../components/parent-dashboard/parent-dashboard.component';

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
  {path:"student-timetable",component:StudentTimetableComponent},
  {path:"studentTeacher",component:TeacherClassesStudentsComponent},
  {path:"studentclass",component:TeacherClassesComponent},
  {path:"marksview",component:MarksviewComponent},
  {path:"adminfeecomponent",component:AdminfeeComponent},
  {path:"studentpayment",component:StudentpaymentComponent},
  {path:"updatestudentprofile",component:StudentProfileComponent},
  {path:"studentmessages", component:StudentMessagesComponent},
  {path:"adminmessages", component:AdminMessagesComponent},
  {path:"studentteachermessage",component:StudentMessagesToTeacherComponent},
  {path:"teacherstudentmeassages",component:TeacherMessagesComponent},
  {path:"studentattendence", component:TeacherAttendenceComponent},
  {path:"viewAttendence",component:StudentAttendenceComponent},
  {path:"studentleave",component:StudentleaverequestComponent},
  {path:"teacherleaveaccept",component:StudentTeacherrequestComponent},
  {path:"parentcommunication",component:ParentCommunicationComponent},
  {path:"vewExamSchedule",component:ViewExamScheduleComponent},
  {path:"scheduleExam",component:ScheduleExamComponent},
  {path:"studentreport",component:StudentattendencereportComponent},
  {path:"adminreport",component:AdminattendencereportComponent},
  {path:"admindeleteteacher",component:AdmindeleteteacherComponent},
  {path:"parent-dashboard",component:ParentDashboardComponent}
 
   // Default route
];
