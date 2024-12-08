import { Component, Input } from '@angular/core';
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
import { ReactiveFormsModule } from '@angular/forms';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';

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
export class TaskCardComponent {
  @Input() task: string = '';
  taskName: string = '';
  taskDescription: string = '';

  saveTask(): void {
    console.log(`Task Updated: ${this.taskName}, ${this.taskDescription}`);
  }
}
