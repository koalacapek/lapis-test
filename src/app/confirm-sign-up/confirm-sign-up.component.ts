import { Component, signal } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { NgOtpInputComponent } from 'ng-otp-input';
import { CognitoService } from '../cognito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-sign-up',
  standalone: true,
  imports: [HlmButtonDirective, NgOtpInputComponent],
  templateUrl: './confirm-sign-up.component.html',
  styleUrl: './confirm-sign-up.component.css',
})
export class ConfirmSignUpComponent {
  code = signal('');
  email = signal<string>('');

  constructor(private Cognito: CognitoService, private router: Router) {
    this.email.set(sessionStorage.getItem('email') || '');
  }

  onOtpChange(event: any) {
    this.code.set(event);
  }

  async handleConfirmSignUp() {
    try {
      await this.Cognito.confirmOtp(this.email(), this.code());
      sessionStorage.removeItem('email');
      this.router.navigate(['dashboard']);
    } catch (e: any) {
      console.error(e);
    }
  }
}
