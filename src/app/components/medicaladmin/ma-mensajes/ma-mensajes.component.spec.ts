import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaMensajesComponent } from './ma-mensajes.component';

describe('MaMensajesComponent', () => {
  let component: MaMensajesComponent;
  let fixture: ComponentFixture<MaMensajesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaMensajesComponent]
    });
    fixture = TestBed.createComponent(MaMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
