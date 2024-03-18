import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLeadComponent } from './register-lead.component';

describe('RegisterLeadComponent', () => {
  let component: RegisterLeadComponent;
  let fixture: ComponentFixture<RegisterLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterLeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
