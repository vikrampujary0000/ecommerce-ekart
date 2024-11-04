import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../models/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o'
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, ProductCardComponent, CarouselModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  router = inject(Router);
  customerService = inject(CustomerService);
  wishlistService = inject(WishlistService);
  cartService = inject(CartService)
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];
  bannerImages: any[] = [];

  ngOnInit() {
    this.getNewProducts();
    this.getFeaturedProducts();
  }

  bannerImageArray() {
    let uniqueProduct = new Map();
    this.bannerImages.forEach((product) => {
      uniqueProduct.set(product.name, product);
    })
    return Array.from(uniqueProduct.values());
  }

  getNewProducts() {
    this.customerService.getNewProducts().subscribe({
      next: (result) => {
        console.log(result);
        this.newProducts = result.newProducts;
        this.bannerImages.push(...result.newProducts)
        this.bannerImages = this.bannerImageArray();
      },
      error: (err) => {
        console.error('Error fetching new products:', err);
      }
    });
  }
  getFeaturedProducts() {
    this.customerService.getFeaturedProducts().subscribe({
      next: (result) => {
        console.log(result);
        this.featuredProducts = result.featuredProducts;
        this.bannerImages.push(...result.featuredProducts);
        this.bannerImages = this.bannerImageArray();
      },
      error: (err) => {
        console.error('Error fetching featured products:', err);
      }
    });
  }


}
