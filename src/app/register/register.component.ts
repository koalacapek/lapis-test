import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';

import { RouterLink } from '@angular/router';
import { AlertDestructiveComponent } from '../shared/alert.component';
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

  constructor() {
    // Automatically track form submission or changes
    effect(() => {
      this.showAlert.set(this.form.invalid && this.form.dirty);
    });
  }

  form = this._formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern]],
    confirm: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.valid) {
      if (this.form.value.confirm !== this.form.value.password) {
        this.showAlert.set(true);
        return;
      } else this.showAlert.set(false);
      console.log('Register data:', this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
