import { Component, inject, Input } from '@angular/core';
import { Product } from '../../models/product';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;

  wishlistService = inject(WishlistService);
  cartService = inject(CartService);
  authService = inject(AuthService);

  onClickWishlist(product: Product, event: MouseEvent) {
    event.stopPropagation();
    const productId = product._id!;
    if (this.isInWishlist(product)) {
      this.removeFromWishlist(productId);
    } else {
      this.addToWishlistApi(productId);
    }
  }

  private addToWishlistApi(productId: string) {
    this.wishlistService.addInWishlist(productId).subscribe({
      next: (result) => {
        console.log("added wishlist product", result)
        this.wishlistService.init();
      },
      error: (err) => {
        console.error('Error adding to wishlist:', err);
      }
    });
  }

  private removeFromWishlist(productId: string) {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: (result) => {
        console.log("removed wishlist product", result)
        this.wishlistService.init()

      },
      error: (err) => {
        console.error('Error removing from wishlist:', err);
      }
    });
  }

  isInWishlist(product: Product): boolean {
    return this.wishlistService.wishlist?.some(x => x._id === product._id) ?? false;
  }

  addToCart(product: Product, event: MouseEvent) {
    event.stopPropagation();
    if (!this.isProductInCart(product._id!)) {
      this.cartService.addToCart(product._id!, 1).subscribe({
        next: () => {
          this.cartService.init();
        },
        error: (err) => console.error('Error adding to cart:', err)
      })
    } else {
      this.cartService.removeFromCart(product._id!).subscribe({
        next: () => {
          this.cartService.init();
        },
        error: (err) => console.error('Error removing from cart:', err)
      });
    }
  }

  isProductInCart(productId: string) {
    return this.cartService.items.some(x => x.product._id === productId);
  }
}
