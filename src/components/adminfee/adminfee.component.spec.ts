import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminfeeComponent } from './adminfee.component';

describe('AdminfeeComponent', () => {
  let component: AdminfeeComponent;
  let fixture: ComponentFixture<AdminfeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminfeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminfeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
