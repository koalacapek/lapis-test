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
import { lucidePen } from '@ng-icons/lucide';
import { TaskCardComponent } from '../task-card/task-card.component';
import { ApiService } from '../../services/api.service';
import { Task } from './type';

@Component({
  selector: 'app-drag-n-drop',
  standalone: true,
  templateUrl: 'drag-n-drop.component.html',
  styleUrl: 'drag-n-drop.component.css',
  imports: [CdkDropList, CdkDrag, CdkDropListGroup, TaskCardComponent],
  providers: provideIcons({ lucidePen }),
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
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
