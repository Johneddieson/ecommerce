import { TestBed } from '@angular/core/testing';

import { VonageapisendsmsService } from './vonageapisendsms.service';

describe('VonageapisendsmsService', () => {
  let service: VonageapisendsmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VonageapisendsmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
