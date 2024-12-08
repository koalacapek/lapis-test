import { Component, OnInit, signal } from '@angular/core';
import { FetchUserAttributesOutput, getCurrentUser } from 'aws-amplify/auth';
import { CognitoService } from '../cognito.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [HlmButtonDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  user = signal<FetchUserAttributesOutput | null>({});
  username = signal('');

  constructor(private Cognito: CognitoService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.user.set(await this.Cognito.initializeUser());
  }

  async handleLogout() {
    await this.Cognito.logout();
    this.router.navigate(['/login']);
  }
}
