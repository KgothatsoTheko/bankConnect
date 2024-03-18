import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksBarComponent } from './tasks-bar.component';

describe('TasksBarComponent', () => {
  let component: TasksBarComponent;
  let fixture: ComponentFixture<TasksBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
