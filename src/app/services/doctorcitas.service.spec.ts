import { TestBed } from '@angular/core/testing';

import { DoctorcitasService } from './doctorcitas.service';

describe('DoctorcitasService', () => {
  let service: DoctorcitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorcitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
