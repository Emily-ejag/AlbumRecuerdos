import { TestBed } from '@angular/core/testing';

import { SpringService } from './spring.service';

describe('SpringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpringService = TestBed.get(SpringService);
    expect(service).toBeTruthy();
  });
});
