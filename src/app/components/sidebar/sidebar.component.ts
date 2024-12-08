import { Component, inject, signal } from '@angular/core';
import {
  lucideHouse,
  lucideBookCheck,
  lucideLogOut,
  lucidePlus,
} from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import { CognitoService } from '../../cognito.service';
import { Router } from '@angular/router';
import { HlmTooltipTriggerDirective } from '@spartan-ng/ui-tooltip-helm';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  HlmFormFieldComponent,
  HlmFormFieldModule,
} from '@spartan-ng/ui-formfield-helm';

@Component({
  selector: 'app-sidebar',
  imports: [
    HlmIconComponent,
    HlmTooltipTriggerDirective,

    BrnDialogContentDirective,
    BrnDialogTriggerDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,

    HlmInputDirective,
    HlmButtonDirective,

    HlmSelectImports,
    BrnSelectImports,

    ReactiveFormsModule,
    HlmFormFieldModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  providers: [
    provideIcons({ lucideHouse, lucideBookCheck, lucideLogOut, lucidePlus }),
  ],
})
export class SidebarComponent {
  private _formBuilder = inject(FormBuilder);

  form = this._formBuilder.group({
    title: ['', [Validators.required]],
    description: [''],
    status: ['', [Validators.required]],
    deadline: [''],
  });

  async onSubmit() {
    console.log(this.form);
    // TODO ADD TO DB
  }

  options = [
    {
      route: '/dashboard',
      icon: 'lucideHouse',
      tooltip: 'Dashboard',
    },
    {
      route: '/tasks',
      icon: 'lucideBookCheck',
      tooltip: 'All Tasks',
    },
  ];

  logout = {
    icon: 'lucideLogOut',
    tooltip: 'Log Out',
  };

  constructor(private Cognito: CognitoService, private router: Router) {}

  async handleLogout() {
    await this.Cognito.logout();
    this.router.navigate(['/login']);
  }

  handleValue(val: any) {
    console.log('val', val);
  }
}
