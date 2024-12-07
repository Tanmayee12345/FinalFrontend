import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentattendencereportComponent } from './studentattendencereport.component';

describe('StudentattendencereportComponent', () => {
  let component: StudentattendencereportComponent;
  let fixture: ComponentFixture<StudentattendencereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentattendencereportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentattendencereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
