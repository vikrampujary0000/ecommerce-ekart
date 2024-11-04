import { Component, inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product';
import { MatSelectModule } from '@angular/material/select';
import { Brand } from '../../../models/brand';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [MatFormField, MatInput, CommonModule, MatLabel, ReactiveFormsModule, MatIconModule, MatSelectModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  formBuilder = inject(FormBuilder);
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  isEdit = false;
  id!: string;

  productForm = this.formBuilder.group({
    name: ['', Validators.required],
    shortDescription: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    discount: [0, [Validators.required, Validators.min(0)]],
    images: this.formBuilder.array([]),
    categoryId: ['', Validators.required],
    brandId: ['', Validators.required],
    isFeaturedProduct: [false],
    isNewProduct: [false]
  });

  brands: Brand[] = [];
  categories: Category[] = [];
  categoryService = inject(CategoryService);
  brandService = inject(BrandService);

  ngOnInit() {

    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.category;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
    this.brandService.getBrands().subscribe({
      next: (response) => {
        this.brands = response.brands;
      },
      error: (err) => {
        console.error('Error fetching brands:', err);
      },
    })
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.isEdit = true;
      this.loadProductData();

    }
    console.log(this.categories);
    console.log(this.brands);
  }

  loadProductData() {
    this.productService.getProductById(this.id).subscribe({
      next: (response) => {
        console.log(response);
        const product = response.product;
        this.productForm.patchValue(product);
        if (product.images) {
          this.images.clear()
          product.images.forEach(() => this.addImage());
          this.images.patchValue(product.images);

        }
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      },
    });
  }


  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  addImage() {
    this.images.push(this.formBuilder.control(''));
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }


  addProduct() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value as Product;
      this.productService.addProduct(formValue).subscribe({
        next: (response) => {
          alert("Product added");
          this.router.navigateByUrl("/admin/products")
        },
        error: (err) => {
          console.error('Error adding product:', err);
        },
      });
    }
  }

  updateProduct() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value as Product;

      this.productService.updateProduct(this.id, formValue).subscribe({
        next: (response) => {
          alert("Product updated");
          this.router.navigateByUrl("/admin/products")
        },
        error: (err) => {
          console.error('Error updating product:', err);
        },
      });
    }
  }
}
