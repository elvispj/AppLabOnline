import { TestBed } from '@angular/core/testing';

import { FormaspagoService } from './formaspago.service';

describe('FormaspagoService', () => {
  let service: FormaspagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormaspagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
