import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksviewComponent } from './marksview.component';

describe('MarksviewComponent', () => {
  let component: MarksviewComponent;
  let fixture: ComponentFixture<MarksviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarksviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarksviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
