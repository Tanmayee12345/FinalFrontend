import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTeacherrequestComponent } from './student-teacherrequest.component';

describe('StudentTeacherrequestComponent', () => {
  let component: StudentTeacherrequestComponent;
  let fixture: ComponentFixture<StudentTeacherrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentTeacherrequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentTeacherrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
