import { TestBed } from '@angular/core/testing';

import { VeteransService } from './veterans.service';

describe('VeteransService', () => {
  let service: VeteransService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeteransService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
