import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaordenComponent } from './altaorden.component';

describe('AltaordenComponent', () => {
  let component: AltaordenComponent;
  let fixture: ComponentFixture<AltaordenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaordenComponent]
    });
    fixture = TestBed.createComponent(AltaordenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
