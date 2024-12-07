import { TestBed } from '@angular/core/testing';

import { MessageServiceTeacherService } from './message-service-teacher.service';

describe('MessageServiceTeacherService', () => {
  let service: MessageServiceTeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageServiceTeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
