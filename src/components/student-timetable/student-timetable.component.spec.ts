import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTimetableComponent } from './student-timetable.component';

describe('StudentTimetableComponent', () => {
  let component: StudentTimetableComponent;
  let fixture: ComponentFixture<StudentTimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentTimetableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
