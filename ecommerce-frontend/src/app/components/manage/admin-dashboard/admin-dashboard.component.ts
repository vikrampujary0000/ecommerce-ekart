import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CustomerProfileComponent } from '../../customer-profile/customer-profile.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatButtonModule, RouterLink, CustomerProfileComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
