import { Injectable } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { signUp, signIn, signOut } from 'aws-amplify/auth';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
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
}
