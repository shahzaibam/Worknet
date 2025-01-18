import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockingRecordsComponent } from './clocking-records.component';

describe('ClockingRecordsComponent', () => {
  let component: ClockingRecordsComponent;
  let fixture: ComponentFixture<ClockingRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClockingRecordsComponent]
    });
    fixture = TestBed.createComponent(ClockingRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
