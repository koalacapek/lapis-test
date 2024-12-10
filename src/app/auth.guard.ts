import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CognitoService } from './services/cognito.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const auth = inject(CognitoService);

  console.log(route, state);
  if (await auth.isAuthenticated()) {
    return true; // Allow access
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // Redirect to login
    return false; // Block access
  }
};

export const confirmGuard: CanActivateFn = async (state) => {
  const router = inject(Router);

  if (sessionStorage.getItem('email')) {
    return true; // Allow access
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // Redirect to login
    return false; // Block access
  }
};
