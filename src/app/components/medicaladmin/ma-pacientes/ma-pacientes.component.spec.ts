import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaPacientesComponent } from './ma-pacientes.component';

describe('MaPacientesComponent', () => {
  let component: MaPacientesComponent;
  let fixture: ComponentFixture<MaPacientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaPacientesComponent]
    });
    fixture = TestBed.createComponent(MaPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
