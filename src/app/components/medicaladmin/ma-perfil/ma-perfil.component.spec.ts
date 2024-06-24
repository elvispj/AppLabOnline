import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaPerfilComponent } from './ma-perfil.component';

describe('MaPerfilComponent', () => {
  let component: MaPerfilComponent;
  let fixture: ComponentFixture<MaPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaPerfilComponent]
    });
    fixture = TestBed.createComponent(MaPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
