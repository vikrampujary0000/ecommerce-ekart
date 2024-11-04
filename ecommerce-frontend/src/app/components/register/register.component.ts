import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formbuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router)

  registerForm = this.formbuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  register() {
    if (this.registerForm.valid) {
      this.authService.registerUser(this.registerForm.value).subscribe({
        next: (response) => {
          alert("Customer registered");
          console.log('User registered successfully:', response);
          this.router.navigateByUrl("/login");
        },
        error: (error) => {
          console.error('Registration error:', error);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
