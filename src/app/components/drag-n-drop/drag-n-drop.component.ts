import { Component, signal } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { provideIcons } from '@ng-icons/core';
import { lucidePen } from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmTooltipTriggerDirective } from '@spartan-ng/ui-tooltip-helm';

import {
  BrnSheetContentDirective,
  BrnSheetTriggerDirective,
} from '@spartan-ng/ui-sheet-brain';
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetDescriptionDirective,
  HlmSheetFooterComponent,
  HlmSheetHeaderComponent,
  HlmSheetTitleDirective,
} from '@spartan-ng/ui-sheet-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmSelectLabelDirective } from '@spartan-ng/ui-select-helm';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-drag-n-drop',
  standalone: true,
  templateUrl: 'drag-n-drop.component.html',
  styleUrl: 'drag-n-drop.component.css',
  imports: [CdkDropList, CdkDrag, CdkDropListGroup, TaskCardComponent],
  providers: provideIcons({ lucidePen }),
})
export class DragNDropComponent {
  todo = ['Task 1', 'Task 2', 'Task 3'];
  inProgress = ['Task 4'];
  completed = ['Task 5', 'Task 6'];

  drop(event: CdkDragDrop<string[]>, status: string) {
    console.log(status);
    console.log(event.previousContainer, event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
