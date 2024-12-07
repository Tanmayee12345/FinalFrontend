import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminattendencereportComponent } from './adminattendencereport.component';

describe('AdminattendencereportComponent', () => {
  let component: AdminattendencereportComponent;
  let fixture: ComponentFixture<AdminattendencereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminattendencereportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminattendencereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
