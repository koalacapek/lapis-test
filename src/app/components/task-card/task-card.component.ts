import {
  Component,
  inject,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  HlmSheetDescriptionDirective,
  HlmSheetFooterComponent,
  HlmSheetHeaderComponent,
} from '@spartan-ng/ui-sheet-helm';
import { HlmSheetTitleDirective } from '@spartan-ng/ui-sheet-helm';
import { HlmSheetContentComponent } from '@spartan-ng/ui-sheet-helm';
import { HlmSheetComponent } from '@spartan-ng/ui-sheet-helm';
import {
  BrnSheetComponent,
  BrnSheetTriggerDirective,
} from '@spartan-ng/ui-sheet-brain';
import { BrnSheetContentDirective } from '@spartan-ng/ui-sheet-brain';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmTooltipTriggerDirective } from '@spartan-ng/ui-tooltip-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { Task } from '../drag-n-drop/type';

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
    deadline: new Date(),
    description: '',
  };
  private _formBuilder = inject(FormBuilder);

  form = this._formBuilder.group({
    title: ['', [Validators.required]],
    description: [''],
    status: ['', [Validators.required]],
    deadline: [new Date()],
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

  saveTask(): void {
    window.location.reload();
  }
}
