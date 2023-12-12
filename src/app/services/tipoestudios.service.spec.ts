import { TestBed } from '@angular/core/testing';

import { TipoestudiosService } from './tipoestudios.service';

describe('TipoestudiosService', () => {
  let service: TipoestudiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoestudiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
