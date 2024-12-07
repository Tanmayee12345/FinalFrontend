import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExamScheduleComponent } from './view-exam-schedule.component';

describe('ViewExamScheduleComponent', () => {
  let component: ViewExamScheduleComponent;
  let fixture: ComponentFixture<ViewExamScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewExamScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewExamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
