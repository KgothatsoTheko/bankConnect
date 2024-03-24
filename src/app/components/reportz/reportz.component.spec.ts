import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportzComponent } from './reportz.component';

describe('ReportzComponent', () => {
  let component: ReportzComponent;
  let fixture: ComponentFixture<ReportzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportzComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
