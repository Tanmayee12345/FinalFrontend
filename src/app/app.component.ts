import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponentComponent } from '../components/register-component/register-component.component';
import { LoginComponentComponent } from '../components/login-component/login-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RegisterComponentComponent,LoginComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
