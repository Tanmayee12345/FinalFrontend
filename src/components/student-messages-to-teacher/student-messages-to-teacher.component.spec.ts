import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMessagesToTeacherComponent } from './student-messages-to-teacher.component';

describe('StudentMessagesToTeacherComponent', () => {
  let component: StudentMessagesToTeacherComponent;
  let fixture: ComponentFixture<StudentMessagesToTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMessagesToTeacherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentMessagesToTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
