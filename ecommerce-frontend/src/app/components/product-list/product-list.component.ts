import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../models/category';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, MatSelectModule, FormsModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: Product[] = [];
  errorMessage: string | null = null;
  searchTerm: string = '';
  categoryId: string = '';
  brandId: string = '';
  sortBy: string = 'price';
  sortOrder: number = -1;
  page = 1;
  pageSize = 6;
  route = inject(ActivatedRoute);
  categories: Category[] = [];
  brands: Brand[] = [];
  isNext = true;


  customerService = inject(CustomerService);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.searchTerm = params.search || '';
      this.categoryId = params.categoryId || '';
      this.brandId = params.brandId || '';
      this.fetchProducts();
      this.getCategories();
      this.getBrands();
    })

  }

  getCategories() {
    this.customerService.getCategories().subscribe({
      next: (result) => {
        console.log(result);
        this.categories = result.category;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  getBrands() {
    this.customerService.getBrands().subscribe({
      next: (result) => {
        console.log(result);
        this.brands = result.brands;
      },
      error: (err) => {
        console.error('Error fetching brands:', err);
      }
    });
  }



  fetchProducts(): void {
    this.customerService.getProducts(this.searchTerm, this.categoryId, this.brandId, this.page, this.pageSize, this.sortBy, this.sortOrder).subscribe({
      next: (response) => {
        this.products = response.products;
        if (this.products.length < this.pageSize) {
          this.isNext = false;
        }
      },
      error: (err) => {
        this.errorMessage = 'Error fetching products';
        console.error(err);
      }
    });
  }

  orderChange(event: any) {
    this.sortBy = 'price';
    this.sortOrder = event;
    this.fetchProducts();
  }

  pageChange(page: number) {
    this.page = page;
    this.isNext = true;
    this.fetchProducts();
  }
}
