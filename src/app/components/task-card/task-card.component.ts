import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  HlmSheetDescriptionDirective,
  HlmSheetFooterComponent,
  HlmSheetHeaderComponent,
} from '@spartan-ng/ui-sheet-helm';
import { HlmSheetTitleDirective } from '@spartan-ng/ui-sheet-helm';
import { HlmSheetContentComponent } from '@spartan-ng/ui-sheet-helm';
import { HlmSheetComponent } from '@spartan-ng/ui-sheet-helm';
import { BrnSheetTriggerDirective } from '@spartan-ng/ui-sheet-brain';
import { BrnSheetContentDirective } from '@spartan-ng/ui-sheet-brain';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmTooltipTriggerDirective } from '@spartan-ng/ui-tooltip-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { Task } from '../../utils/type';

import {
  BrnAlertDialogContentDirective,
  BrnAlertDialogTriggerDirective,
} from '@spartan-ng/ui-alertdialog-brain';
import {
  HlmAlertDialogActionButtonDirective,
  HlmAlertDialogCancelButtonDirective,
  HlmAlertDialogComponent,
  HlmAlertDialogContentComponent,
  HlmAlertDialogDescriptionDirective,
  HlmAlertDialogFooterComponent,
  HlmAlertDialogHeaderComponent,
  HlmAlertDialogTitleDirective,
} from '@spartan-ng/ui-alertdialog-helm';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-task-card',
  imports: [
    BrnSheetTriggerDirective,
    BrnSheetContentDirective,
    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmSheetHeaderComponent,
    HlmSheetFooterComponent,
    HlmSheetTitleDirective,
    HlmSheetDescriptionDirective,

    HlmIconComponent,
    HlmInputDirective,
    HlmTooltipTriggerDirective,
    HlmButtonDirective,

    HlmSelectImports,
    BrnSelectImports,

    HlmFormFieldModule,
    ReactiveFormsModule,

    BrnAlertDialogTriggerDirective,
    BrnAlertDialogContentDirective,

    HlmAlertDialogComponent,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogFooterComponent,
    HlmAlertDialogTitleDirective,
    HlmAlertDialogDescriptionDirective,
    HlmAlertDialogCancelButtonDirective,
    HlmAlertDialogActionButtonDirective,
    HlmAlertDialogContentComponent,
  ],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent implements OnChanges {
  @Input() task: Task = {
    status: '',
    taskId: '',
    title: '',
    userId: '',
    deadline: '',
    description: '',
  };
  private _formBuilder = inject(FormBuilder);

  constructor(private apiService: ApiService) {}

  form = this._formBuilder.group({
    title: ['', [Validators.required]],
    description: [''],
    status: ['', [Validators.required]],
    deadline: [''],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && changes['task'].currentValue) {
      this.form.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
        deadline: this.task.deadline,
      });
    }
  }

  handleDeleteTask = () => {
    console.log(this.task.taskId);
    this.apiService.deleteTask(this.task.taskId).subscribe({
      error: (e) => console.error(e),
      complete: () => window.location.reload(),
    });
  };

  handleUpdateTask = (): void => {
    const newDetail = {
      taskId: this.task.taskId,
      userId: this.task.userId,
      // Either new or old data
      status: this.form.value.status || this.task.status,
      title: this.form.value.title || this.task.title,
      // These 2 are optional attribute
      description: this.form.value.description || '',
      deadline: this.form.value.deadline || '',
    };

    this.apiService.updateTask(newDetail).subscribe({
      error: (e) => console.error(e),
      complete: () => window.location.reload(),
    });
  };
}
