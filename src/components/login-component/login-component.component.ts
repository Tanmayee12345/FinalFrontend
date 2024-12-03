import { Component } from '@angular/core';
import { UserService } from '../../service/user-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'] // Corrected property name
})
export class LoginComponentComponent {
  user = { username: '', password: '' };
  message = '';

  constructor(private userService: UserService) {}

  login() {
    this.userService.login(this.user).subscribe({
      next: (response) => {
        this.message = 'Login successful!';
        console.log('Login successful!');
      },
      error: (error) => {
        this.message = 'Invalid username or password!';
        console.error('Login failed:', error);
      },
      complete: () => {
        console.log('Login request completed.');
      },
    });
  }
}
