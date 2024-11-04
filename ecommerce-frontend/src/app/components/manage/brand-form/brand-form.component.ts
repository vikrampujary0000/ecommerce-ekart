import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrandService } from '../../../services/brand.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent {
  name!: string;
  brandService = inject(BrandService)
  router = inject(Router);
  route = inject(ActivatedRoute);
  id!: string;
  isEdit = false;

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.isEdit = true;
      this.brandService.getBrandById(this.id).subscribe({
        next: (response) => {
          if (response && response.brand) {
            this.name = response.brand.name;
          } else {
            console.error('Brand not found');
          }
        },
        error: (err) => {
          console.error('Error fetching brand:', err);
        },
      })
    }
  }

  addBrand() {
    this.brandService.addBrand(this.name).subscribe({
      next: (response) => {
        alert("Brand added");
        this.router.navigateByUrl("/admin/brands")
      },
      error: (err) => {
        console.error('Error adding brands:', err);
      },
    });
  }

  updateBrand() {
    this.brandService.updateBrand(this.id, this.name).subscribe({
      next: (response) => {
        alert("Brand updated");
        this.router.navigateByUrl("/admin/brands")
      },
      error: (err) => {
        console.error('Error updating brand:', err);
      },
    })
  }
}
