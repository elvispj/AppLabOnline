import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaAltapacienteComponent } from './ma-altapaciente.component';

describe('MaAltapacienteComponent', () => {
  let component: MaAltapacienteComponent;
  let fixture: ComponentFixture<MaAltapacienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaAltapacienteComponent]
    });
    fixture = TestBed.createComponent(MaAltapacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
