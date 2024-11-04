import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  http = inject(HttpClient);
  wishlist!: Product[];

  init() {
    this.getWishlist().subscribe(result => {
      this.wishlist = result.wishlist;
      return this.wishlist;
    });
  }

  getWishlist(): Observable<{ wishlist: Product[], message: string }> {
    return this.http.get<{ wishlist: Product[], message: string }>(`${environment.apiUrl}/customer/wishlist`).pipe(
      catchError((err) => {
        console.error('Error fetching wishlist:', err);
        return throwError(() => new Error('Error fetching wishlist'));
      })
    );
  }

  addInWishlist(productId: string): Observable<{ wishlist: Product, message: string }> {
    return this.http.post<{ wishlist: Product, message: string }>(`${environment.apiUrl}/customer/wishlist/${productId}`, { productId }).pipe(
      catchError((err) => {
        console.error('Error adding product to wishlist:', err);
        return throwError(() => new Error('Error adding product to wishlist'));
      })
    );
  }

  removeFromWishlist(productId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${environment.apiUrl}/customer/wishlist/${productId}`).pipe(
      catchError((err) => {
        console.error('Error removing product from wishlist:', err);
        return throwError(() => new Error('Error removing product from wishlist'));
      })
    );
  }
}
