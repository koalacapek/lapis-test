import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';

import { Router, RouterLink } from '@angular/router';
import { CognitoService } from '../cognito.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmInputDirective,
    HlmFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);

  constructor(private Cognito: CognitoService, private router: Router) {}

  form = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  async ngOnInit(): Promise<void> {
    const user = await this.Cognito.isAuthenticated();
    if (user) this.router.navigate(['/dashboard']);
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      console.log('Login data:', this.form.value);
      await this.Cognito.login(
        this.form.value.email || '',
        this.form.value.password || ''
      );
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Form is invalid');
    }
  }
}
