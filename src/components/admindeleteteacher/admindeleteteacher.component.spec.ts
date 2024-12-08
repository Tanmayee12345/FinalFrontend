import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindeleteteacherComponent } from './admindeleteteacher.component';

describe('AdmindeleteteacherComponent', () => {
  let component: AdmindeleteteacherComponent;
  let fixture: ComponentFixture<AdmindeleteteacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmindeleteteacherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmindeleteteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
