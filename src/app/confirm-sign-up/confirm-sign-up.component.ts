import { Component, signal } from '@angular/core';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-confirm-sign-up',
  standalone: true,
  imports: [HlmInputDirective, HlmButtonDirective],
  templateUrl: './confirm-sign-up.component.html',
  styleUrl: './confirm-sign-up.component.css',
})
export class ConfirmSignUpComponent {
  code = signal(null);
}
