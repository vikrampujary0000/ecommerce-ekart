import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formbuilder = inject(FormBuilder);
  authService = inject(AuthService);  // Inject the AuthService
  snackbar = inject(MatSnackBar);
  router = inject(Router); // Inject the Router
  errorMessage: string | null = null; // For displaying error messages

  loginForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  login() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('User logged in successfully:', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          console.error('Login error:', error);
          this.showErrorMessage();
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }

  showErrorMessage() {
    this.snackbar.open('Invalid email or password. Please try again.', 'Close', {
      duration: 3000,  // Duration in milliseconds
      verticalPosition: 'top',  // Position on the screen
      horizontalPosition: 'center',  // Horizontal position
      panelClass: ['snackbar-error']  // Custom styling class
    });
  }
}
