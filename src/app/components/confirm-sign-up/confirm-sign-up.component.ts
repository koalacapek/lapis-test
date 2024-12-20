import { Component, signal } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { NgOtpInputComponent } from 'ng-otp-input';
import { CognitoService } from '../../services/cognito.service';
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
  password = signal<string>('');

  constructor(private Cognito: CognitoService, private router: Router) {
    this.email.set(sessionStorage.getItem('email') || '');
    this.password.set(sessionStorage.getItem('password') || '');
  }

  onOtpChange(event: any) {
    this.code.set(event);
  }

  async handleConfirmSignUp() {
    try {
      await this.Cognito.confirmOtp(this.email(), this.password(), this.code());
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('password');
      this.router.navigate(['dashboard']);
    } catch (e: any) {
      console.error(e);
    }
  }
}
