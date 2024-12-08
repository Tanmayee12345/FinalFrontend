import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardMdImage, MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-parent-dashboard',
  standalone: true,
  imports: [MatButtonModule,MatToolbarModule,RouterLink],
  templateUrl: './parent-dashboard.component.html',
  styleUrl: './parent-dashboard.component.scss'
})
export class ParentDashboardComponent {
  constructor( private router: Router) {}
  logout(): void {
    this.router.navigate(['/logindetails']); 
  }
  

}
