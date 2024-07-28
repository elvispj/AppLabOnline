import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaViewpacienteComponent } from './ma-viewpaciente.component';

describe('MaViewpacienteComponent', () => {
  let component: MaViewpacienteComponent;
  let fixture: ComponentFixture<MaViewpacienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaViewpacienteComponent]
    });
    fixture = TestBed.createComponent(MaViewpacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
