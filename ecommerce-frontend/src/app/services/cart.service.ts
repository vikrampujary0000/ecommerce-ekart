import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '../models/product';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  http = inject(HttpClient);
  items: CartItem[] = []

  init() {
    this.getCartItems().subscribe(result => {
      this.items = result.items;
    });
  }


  getCartItems(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/customer/cart`).pipe(
      catchError((err) => {
        console.error(`Error fetching cart items :`, err);
        return throwError(() => new Error(`Error fetching cart items`));
      })
    );
  }

  addToCart(productId: string, quantity: number) {
    return this.http.post(`${environment.apiUrl}/customer/cart/${productId}`, { quantity: quantity }).pipe(
      catchError((err) => {
        console.error(`Error adding cart items :`, err);
        return throwError(() => new Error(`Error adding cart items`));
      })
    );
  }

  removeFromCart(productId: string) {
    return this.http.delete(`${environment.apiUrl}/customer/cart/${productId}`).pipe(
      catchError((err) => {
        console.error(`Error deleting cart items :`, err);
        return throwError(() => new Error(`Error deleting cart items`));
      })
    );
  }
}
