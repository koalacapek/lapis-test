import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CognitoService } from './cognito.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const auth = inject(CognitoService);

  if (await auth.isAuthenticated()) {
    return true; // Allow access
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // Redirect to login
    return false; // Block access
  }
};
