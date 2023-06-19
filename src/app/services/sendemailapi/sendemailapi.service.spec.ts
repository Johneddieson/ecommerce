import { TestBed } from '@angular/core/testing';

import { SendemailapiService } from './sendemailapi.service';

describe('SendemailapiService', () => {
  let service: SendemailapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendemailapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
