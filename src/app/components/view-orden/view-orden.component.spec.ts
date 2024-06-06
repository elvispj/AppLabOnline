import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrdenComponent } from './view-orden.component';

describe('ViewOrdenComponent', () => {
  let component: ViewOrdenComponent;
  let fixture: ComponentFixture<ViewOrdenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOrdenComponent]
    });
    fixture = TestBed.createComponent(ViewOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
