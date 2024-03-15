import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographLineComponent } from './demograph-line.component';

describe('DemographLineComponent', () => {
  let component: DemographLineComponent;
  let fixture: ComponentFixture<DemographLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemographLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemographLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
