import { TestBed } from '@angular/core/testing';

import { AuthForLoginSignupGuard } from './auth-for-login-signup.guard';

describe('AuthForLoginSignupGuard', () => {
  let guard: AuthForLoginSignupGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthForLoginSignupGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
