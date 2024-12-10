import { Component, OnInit, signal } from '@angular/core';
import { AuthUser, FetchUserAttributesOutput } from 'aws-amplify/auth';
import { CognitoService } from '../../services/cognito.service';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { DragNDropComponent } from '../drag-n-drop/drag-n-drop.component';
import { ApiService } from '../../services/api.service';
import { Task } from '../../utils/type';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, HlmSpinnerComponent, DragNDropComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  user = signal<FetchUserAttributesOutput | null>(null);
  userData = signal<AuthUser | null>(null);
  tasks = signal<Task[]>([]);
  loading = signal(true);

  constructor(
    private Cognito: CognitoService,
    private router: Router,
    private apiService: ApiService
  ) {}

  async fetchTasks(): Promise<void> {
    try {
      const tasks: Task[] = await firstValueFrom(
        this.apiService.getUserTasks(this.userData()?.userId || '')
      );

      this.tasks.set(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  async ngOnInit(): Promise<void> {
    try {
      const user = await this.Cognito.initializeUser();
      this.user.set(user);

      const userData = await this.Cognito.getCurrentUserData();
      this.userData.set(userData);

      await this.fetchTasks();
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.router.navigate(['/login']); // Redirect if unable to fetch user
    } finally {
      this.loading.set(false); // Data is ready
    }
  }
}
