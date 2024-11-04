import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);

  getNewProducts(): Observable<{ newProducts: Product[], message: string }> {
    return this.http.get<{ newProducts: Product[], message: string }>(`${environment.apiUrl}/customer/new-products`).pipe(
      catchError((err) => {
        console.error('Error fetching new products:', err);
        return throwError(() => new Error('Error fetching new products'));
      })
    )
  }

  getFeaturedProducts(): Observable<{ featuredProducts: Product[], message: string }> {
    return this.http.get<{ featuredProducts: Product[], message: string }>(`${environment.apiUrl}/customer/featured-products`).pipe(
      catchError((err) => {
        console.error('Error fetching featured products:', err);
        return throwError(() => new Error('Error fetching featured products'));
      })
    )
  }

  getCategories(): Observable<{ category: Category[], message: string }> {
    return this.http.get<{ category: Category[], message: string }>(`${environment.apiUrl}/customer/categories`).pipe(
      catchError((err) => {
        console.error('Error fetching categories:', err);
        return throwError(() => new Error('Error fetching categories'));
      })
    )
  }

  getBrands(): Observable<{ brands: Brand[], message: string }> {
    return this.http.get<{ brands: Brand[], message: string }>(`${environment.apiUrl}/customer/brands`).pipe(
      catchError((err) => {
        console.error('Error fetching brands:', err);
        return throwError(() => new Error('Error fetching brands'));
      })
    )
  }


  getProducts(searchTerm: string = '', categoryId: string = '', brandId: string = '', pageNo: number = 1, pageSize: number = 10, sortBy: string = 'price', sortOrder: number = -1): Observable<{ products: Product[], message: string }> {
    const params: any = {
      pageNo: pageNo.toString(),
      pageSize: pageSize.toString(),
      sortBy,
      sortOrder: sortOrder.toString()
    };

    if (searchTerm) {
      params.searchTerm = searchTerm;
    }

    if (categoryId) {
      params.categoryId = categoryId;
    }

    if (brandId) {
      params.brandId = brandId;
    }
    return this.http.get<{ products: Product[], message: string }>(`${environment.apiUrl}/customer/products`, { params }).pipe(
      catchError((err) => {
        console.error('Error fetching products:', err);
        return throwError(() => new Error('Error fetching products'));
      })
    );
  }

  getProductById(id: any) {
    return this.http.get<{ product: Product, message: string }>(`${environment.apiUrl}/customer/product/${id}`).pipe(
      catchError((err) => {
        console.error('Error fetching product with id :' + id, err);
        return throwError(() => new Error('Error fetching product with id' + id));
      })
    );;
  }
}