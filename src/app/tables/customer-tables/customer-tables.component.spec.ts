import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTablesComponent } from './customer-table.component';

describe('CustomerTablesComponent', () => {
  let component: CustomerTablesComponent;
  let fixture: ComponentFixture<CustomerTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
