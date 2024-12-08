import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';

import { RouterLink, Router } from '@angular/router';
import { AlertDestructiveComponent } from '../shared/alert.component';
import { CognitoService } from '../cognito.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmInputDirective,
    CommonModule,
    ReactiveFormsModule,
    HlmFormFieldModule,
    RouterLink,
    AlertDestructiveComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  animations: [
    trigger('slideInFromTop', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate(
          '200ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ transform: 'translateY(-100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class RegisterComponent {
  private _formBuilder = inject(FormBuilder);

  showAlert = signal(false);

  constructor(private Cognito: CognitoService, private router: Router) {
    // Automatically track form submission or changes
    effect(() => {
      this.showAlert.set(this.form.invalid && this.form.dirty);
    });
  }

  form = this._formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ],
    ],
    confirm: ['', Validators.required],
  });

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const username = this.form.get('username')?.value as string;
      const email = this.form.get('email')?.value as string;
      const password = this.form.get('password')?.value as string;
      const confirm = this.form.get('confirm')?.value as string;

      // Check if passwords match
      if (password !== confirm) {
        this.showAlert.set(true);
        console.error('Passwords do not match.');
        return;
      }

      try {
        // Await the result of the Cognito registration
        const result = await this.Cognito.register(username, email, password);

        sessionStorage.setItem('email', email);
        this.router.navigate(['/confirmSignUp']);
      } catch (error) {
        console.error('Registration error:', error);
        this.showAlert.set(true); // Show alert on error
      }
    } else {
      console.error('Form is invalid.');
    }
  }
}