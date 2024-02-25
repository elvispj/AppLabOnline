import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDoctoresComponent } from './admin-doctores.component';

describe('AdminDoctoresComponent', () => {
  let component: AdminDoctoresComponent;
  let fixture: ComponentFixture<AdminDoctoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDoctoresComponent]
    });
    fixture = TestBed.createComponent(AdminDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
