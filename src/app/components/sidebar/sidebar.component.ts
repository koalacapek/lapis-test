import { Component, inject, Input } from '@angular/core';
import {
  lucideHouse,
  lucideBookCheck,
  lucideLogOut,
  lucidePlus,
} from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import { CognitoService } from '../../services/cognito.service';
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
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { v4 as uuidv4 } from 'uuid';

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

    CommonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  providers: [
    provideIcons({ lucideHouse, lucideBookCheck, lucideLogOut, lucidePlus }),
  ],
})
export class SidebarComponent {
  @Input() userId!: string;
  private _formBuilder = inject(FormBuilder);

  constructor(
    private Cognito: CognitoService,
    private router: Router,
    private apiService: ApiService
  ) {}

  form = this._formBuilder.group({
    title: ['', [Validators.required]],
    description: [''],
    status: ['', [Validators.required]],
    deadline: [new Date()],
  });

  options = [
    {
      route: '/dashboard',
      icon: 'lucideHouse',
      tooltip: 'Dashboard',
      disabled: false,
    },
    {
      route: '/tasks',
      icon: 'lucideBookCheck',
      tooltip: 'Coming soon',
      disabled: true,
    },
  ];

  logout = {
    icon: 'lucideLogOut',
    tooltip: 'Log Out',
  };

  async getTaskId() {
    const tasks = await this.apiService.getTasks();

    if (tasks) {
      return tasks.length.toString();
    }
    return '0';
  }

  async onSubmit() {
    const date = 'todo tanggal';
    const data = {
      taskId: uuidv4(),
      userId: this.userId,
      title: this.form.value.title || '',
      description: this.form.value.description || '',
      deadline: date || '',
      status: this.form.value.status || '',
    };
    // Checking was done before submitting so now all fields should be valid

    this.apiService.createTask(data).subscribe({
      error: (e) => console.error('Error creating task:', e),
      complete: () => {
        console.log('Task created successfully:');
        window.location.reload();
      },
    });
  }

  async handleLogout() {
    await this.Cognito.logout();
    this.router.navigate(['/login']);
  }
}
