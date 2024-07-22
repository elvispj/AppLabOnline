import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaMenuComponent } from './ma-menu.component';

describe('MaMenuComponent', () => {
  let component: MaMenuComponent;
  let fixture: ComponentFixture<MaMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaMenuComponent]
    });
    fixture = TestBed.createComponent(MaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
