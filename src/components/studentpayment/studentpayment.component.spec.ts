import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentpaymentComponent } from './studentpayment.component';

describe('StudentpaymentComponent', () => {
  let component: StudentpaymentComponent;
  let fixture: ComponentFixture<StudentpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentpaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
