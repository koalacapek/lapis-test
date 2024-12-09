import { Injectable, signal } from '@angular/core';
import { Amplify } from 'aws-amplify';
import {
  signUp,
  signIn,
  signOut,
  confirmSignUp,
  autoSignIn,
  fetchUserAttributes,
  FetchUserAttributesOutput,
  getCurrentUser,
} from 'aws-amplify/auth';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  user = signal<FetchUserAttributesOutput>({});

  constructor() {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: environment.userPoolId,
          userPoolClientId: environment.userPoolWebClientId,
        },
      },
    });
  }

  login(email: string, password: string): Promise<any> {
    return signIn({
      username: email,
      password: password,
    });
  }

  async logout() {
    await signOut();
  }

  register(username: string, email: string, password: string): Promise<any> {
    return signUp({
      username: email,
      password: password,
      options: {
        userAttributes: {
          preferred_username: username,
        },
      },
    });
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const user = await getCurrentUser(); // Replace with your actual function to get the user
      console.log('Authenticated user:', user);
      return true; // User is authenticated
    } catch (error) {
      return false; // User is not authenticated
    }
  }

  async initializeUser() {
    try {
      const user = await fetchUserAttributes();
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  async confirmOtp(email: string, code: string): Promise<void> {
    try {
      // Confirm the sign-up process
      const { nextStep } = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      // Check the next step after confirmation
      if (nextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
        console.log('Sign-up complete, attempting auto sign-in.');

        // Automatically sign in the user
        const { nextStep } = await autoSignIn();

        if (nextStep.signInStep === 'DONE') {
          console.log('Successfully signed in.');
        } else {
          console.log('Auto sign-in step:', nextStep.signInStep);
        }
      } else {
        console.log('Sign-up confirmed. No auto sign-in required.');
      }
    } catch (error) {
      console.error('Error confirming sign-up or signing in:', error);
      throw error; // Re-throw the error for higher-level handling
    }
  }
}
