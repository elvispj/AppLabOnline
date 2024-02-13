import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEstudioComponent } from './detalle-estudio.component';

describe('DetalleEstudioComponent', () => {
  let component: DetalleEstudioComponent;
  let fixture: ComponentFixture<DetalleEstudioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleEstudioComponent]
    });
    fixture = TestBed.createComponent(DetalleEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
