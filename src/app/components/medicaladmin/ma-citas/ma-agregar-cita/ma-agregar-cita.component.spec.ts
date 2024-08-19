import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaAgregarCitaComponent } from './ma-agregar-cita.component';

describe('MaAgregarCitaComponent', () => {
  let component: MaAgregarCitaComponent;
  let fixture: ComponentFixture<MaAgregarCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaAgregarCitaComponent]
    });
    fixture = TestBed.createComponent(MaAgregarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
