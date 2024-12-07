import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentCommunicationComponent } from './parent-communication.component';

describe('ParentCommunicationComponent', () => {
  let component: ParentCommunicationComponent;
  let fixture: ComponentFixture<ParentCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentCommunicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParentCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
