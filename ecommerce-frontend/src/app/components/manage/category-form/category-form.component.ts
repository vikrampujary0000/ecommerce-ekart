import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {
  name!: string;
  categoryService = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit = false;
  id!: string;

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.isEdit = true;
      this.categoryService.getCategoryById(this.id).subscribe({
        next: (response) => {
          if (response && response.category) {
            this.name = response.category.name;
          } else {
            console.error('Category not found');
          }
        },
        error: (err) => {
          console.error('Error fetching category:', err);
        },
      })
    }
  }

  addCategory() {
    this.categoryService.addCategory(this.name).subscribe({
      next: (response) => {
        alert("Category added");
        this.router.navigateByUrl("/admin/categories")
      },
      error: (err) => {
        console.error('Error adding category:', err);
      },
    });
  }

  updateCategory() {
    this.categoryService.updateCategory(this.id, this.name).subscribe({
      next: (response) => {
        alert("Category updated");
        this.router.navigateByUrl("/admin/categories")
      },
      error: (err) => {
        console.error('Error updating category:', err);
      },
    })
  }
}
