import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaDashboardComponent } from './ma-dashboard.component';

describe('MaDashboardComponent', () => {
  let component: MaDashboardComponent;
  let fixture: ComponentFixture<MaDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaDashboardComponent]
    });
    fixture = TestBed.createComponent(MaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
