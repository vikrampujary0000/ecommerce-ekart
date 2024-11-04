import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);

  getProducts(): Observable<{ products: Product[], message: string }> {
    return this.http.get<{ products: Product[], message: string }>(`${environment.apiUrl}/product`).pipe(
      catchError((err) => {
        console.error('Error fetching products:', err);
        return throwError(() => new Error('Error fetching products'));
      })
    )
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post(`${environment.apiUrl}/product`, product).pipe(
      catchError((err) => {
        console.error('Error adding product:', err);
        return throwError(() => new Error('Error adding product'));
      })
    );;
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/product/${id}`).pipe(
      catchError((err) => {
        console.error(`Error fetching product with id ${id}:`, err);
        return throwError(() => new Error(`Error fetching product with id ${id}`));
      })
    );
  }

  updateProduct(id: string, product: Product): Observable<any> {
    return this.http.put(`${environment.apiUrl}/product/${id}`, product).pipe(
      catchError((err) => {
        console.error(`Error updating product with id ${id}:`, err);
        return throwError(() => new Error(`Error updating product with id ${id}`));
      })
    );
  }

  deleteProductById(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/product/${id}`).pipe(
      catchError((err) => {
        console.error(`Error deleting product with id ${id}:`, err);
        return throwError(() => new Error(`Error deleting product with id ${id}`));
      })
    );
  }
}
