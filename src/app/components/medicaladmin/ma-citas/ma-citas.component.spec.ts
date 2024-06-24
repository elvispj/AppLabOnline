import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaCitasComponent } from './ma-citas.component';

describe('MaCitasComponent', () => {
  let component: MaCitasComponent;
  let fixture: ComponentFixture<MaCitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaCitasComponent]
    });
    fixture = TestBed.createComponent(MaCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
