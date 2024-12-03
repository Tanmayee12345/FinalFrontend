import { Component } from '@angular/core';
import { UserService } from '../../service/user-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.scss'
})
export class RegisterComponentComponent {
  user = { id: '', username: '', password: '' };
  message = '';

  constructor(private userService: UserService) {}

  register() {
    if (!this.user.id || !this.user.username || !this.user.password) {
      this.message = 'ID, Username, and Password are required!';
      return;
    }

    this.userService.register(this.user).subscribe(
      (response) => {
        this.message = response.message || 'Registration successful!';
      },
      (error) => {
        console.error('Registration error:', error);
        this.message = error.error?.message || 'Registration failed!';
      }
    );
  }

}
