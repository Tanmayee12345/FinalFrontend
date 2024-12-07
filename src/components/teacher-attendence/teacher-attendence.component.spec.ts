import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAttendenceComponent } from './teacher-attendence.component';

describe('TeacherAttendenceComponent', () => {
  let component: TeacherAttendenceComponent;
  let fixture: ComponentFixture<TeacherAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAttendenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
