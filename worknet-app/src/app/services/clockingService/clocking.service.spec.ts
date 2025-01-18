import { TestBed } from '@angular/core/testing';

import { ClockingService } from './clocking.service';

describe('ClockingService', () => {
  let service: ClockingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClockingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
