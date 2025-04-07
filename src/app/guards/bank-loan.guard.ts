import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MasterService } from '../service/master.service';

export const bankLoanGuard: CanActivateFn = (route, state) => {
  const masterService = inject(MasterService);
  const router = inject(Router);

  if (masterService.loggedUserData) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
