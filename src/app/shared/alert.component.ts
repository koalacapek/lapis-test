import { Component } from '@angular/core';
import {
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
  HlmAlertIconDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideTriangleAlert } from '@ng-icons/lucide';

@Component({
  selector: 'alert-destructive',
  standalone: true,
  imports: [
    HlmAlertDirective,
    HlmAlertDescriptionDirective,
    HlmAlertIconDirective,
    HlmIconComponent,
  ],
  providers: [provideIcons({ lucideTriangleAlert })],
  template: `
    <div hlmAlert variant="destructive" class="bg-white">
      <hlm-icon hlmAlertIcon name="lucideTriangleAlert" />
      <p hlmAlertDesc>Password does not match</p>
    </div>
  `,
})
export class AlertDestructiveComponent {}
