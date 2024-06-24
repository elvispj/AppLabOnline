import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaladminComponent } from './medicaladmin.component';

describe('MedicaladminComponent', () => {
  let component: MedicaladminComponent;
  let fixture: ComponentFixture<MedicaladminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicaladminComponent]
    });
    fixture = TestBed.createComponent(MedicaladminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
