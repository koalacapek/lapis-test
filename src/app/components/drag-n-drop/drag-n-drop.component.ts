import { Component, Input, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { provideIcons } from '@ng-icons/core';
import { lucidePen, lucideTrash } from '@ng-icons/lucide';
import { TaskCardComponent } from '../task-card/task-card.component';
import { ApiService } from '../../services/api.service';
import { Task } from '../../utils/type';

@Component({
  selector: 'app-drag-n-drop',
  standalone: true,
  templateUrl: 'drag-n-drop.component.html',
  styleUrl: 'drag-n-drop.component.css',
  imports: [CdkDropList, CdkDrag, CdkDropListGroup, TaskCardComponent],
  providers: provideIcons({ lucidePen, lucideTrash }),
})
export class DragNDropComponent implements OnInit {
  @Input() tasks!: Task[];
  todo: Task[] = [];
  inProgress: Task[] = [];
  completed: Task[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.todo = this.tasks.filter((task) => task.status === 'todo');
    this.inProgress = this.tasks.filter(
      (task) => task.status === 'in_progress'
    );
    this.completed = this.tasks.filter((task) => task.status === 'completed');
  }

  drop(event: CdkDragDrop<Task[]>, status: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // If moved to other container, update the db as well
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Get task data from event.container.data[0]
      const taskData = event.container.data[0];
      const newDetail = {
        taskId: taskData.taskId,
        userId: taskData.userId,
        // update status with new status
        status: status,
        title: taskData.title,
        description: taskData.description || '',
        deadline: taskData.deadline || '',
      };

      // if success dont reload as frontend will be up to date alr
      this.apiService.updateTask(newDetail).subscribe({
        error: (e) => console.error(e),
        complete: () => console.log('Updated successfully'),
      });
    }
  }
}
