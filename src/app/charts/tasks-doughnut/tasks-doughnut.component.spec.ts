import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDoughnutComponent } from './tasks-doughnut.component';

describe('TasksDoughnutComponent', () => {
  let component: TasksDoughnutComponent;
  let fixture: ComponentFixture<TasksDoughnutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksDoughnutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
