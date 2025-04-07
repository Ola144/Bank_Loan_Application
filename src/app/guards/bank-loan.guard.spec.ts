import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { bankLoanGuard } from './bank-loan.guard';

describe('bankLoanGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => bankLoanGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
