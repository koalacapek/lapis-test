import { Component, OnInit, signal } from '@angular/core';
import { FetchUserAttributesOutput } from 'aws-amplify/auth';
import { CognitoService } from '../../services/cognito.service';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { DragNDropComponent } from '../drag-n-drop/drag-n-drop.component';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, HlmSpinnerComponent, DragNDropComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  user = signal<FetchUserAttributesOutput | null>(null);
  loading = signal(true);

  constructor(private Cognito: CognitoService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    try {
      const user = await this.Cognito.initializeUser();
      this.user.set(user); // Set the user data
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.router.navigate(['/login']); // Redirect if unable to fetch user
    } finally {
      this.loading.set(false); // Data is ready
    }
  }
}
