import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherClassesStudentsComponent } from './teacher-classes-students.component';

describe('TeacherClassesStudentsComponent', () => {
  let component: TeacherClassesStudentsComponent;
  let fixture: ComponentFixture<TeacherClassesStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherClassesStudentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherClassesStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
