import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockingButtonsComponent } from './clocking-buttons.component';

describe('ClockingButtonsComponent', () => {
  let component: ClockingButtonsComponent;
  let fixture: ComponentFixture<ClockingButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClockingButtonsComponent]
    });
    fixture = TestBed.createComponent(ClockingButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
