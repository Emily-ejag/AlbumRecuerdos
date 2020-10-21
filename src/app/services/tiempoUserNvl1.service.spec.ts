import { TestBed } from '@angular/core/testing';
import { TiempoUserNvl1 } from './tiempoUserNvl1.service';

describe('SpringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiempoUserNvl1 = TestBed.get(TiempoUserNvl1);
    expect(service).toBeTruthy();
  });
});
