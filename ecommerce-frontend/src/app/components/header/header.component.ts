import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  customerService = inject(CustomerService);
  categoryList: Category[] = [];
  router = inject(Router);
  authService = inject(AuthService);
  searchTerm: string = '';

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.customerService.getCategories().subscribe({
      next: (result) => {
        console.log(result);
        this.categoryList = result.category;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  onSearch(event: any) {
    if (event.target.value) {
      this.router.navigateByUrl("/products?search=" + event.target.value)
    }
  }

  onSearchButton() {
    if (this.searchTerm) {
      this.router.navigateByUrl("/products?search=" + this.searchTerm)
    }
  }

  searchCategory(id: string) {
    this.searchTerm = '';
    this.router.navigateByUrl("/products?categoryId=" + id)
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
