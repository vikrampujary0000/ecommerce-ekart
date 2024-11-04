import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ProductCardComponent, MatIconModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);

  product: any;
  selectedImage: string | null = null;
  similarProducts: any;
  wishlistService = inject(WishlistService)
  cartService = inject(CartService);
  authService = inject(AuthService);

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.getProductDetails(params.id);
    })
  }
  getProductDetails(id: string) {
    this.customerService.getProductById(id).subscribe({
      next: (result) => {
        console.log(result);
        this.product = result.product;
        this.selectedImage = this.product.images[0];
        if (this.product) {

          this.customerService.getProducts('', this.product.categoryId, '', 1, 10, 'price', -1).subscribe({
            next: (result) => {
              console.log(result);
              this.similarProducts = result.products.filter((x) => x._id !== this.product._id);
            },
            error: (err) => {
              console.error('Error fetching products:', err);
            }
          });
        }

      },
      error: (err) => {
        console.error('Error fetching product:', err);
      }
    });

  }

  onImageSelect(image: string) {
    this.selectedImage = image;
  }

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
