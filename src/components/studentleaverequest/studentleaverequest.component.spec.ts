import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentleaverequestComponent } from './studentleaverequest.component';

describe('StudentleaverequestComponent', () => {
  let component: StudentleaverequestComponent;
  let fixture: ComponentFixture<StudentleaverequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentleaverequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentleaverequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
