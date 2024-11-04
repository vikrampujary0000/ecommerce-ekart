import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/product';

@Component({
  selector: 'app-wishlists',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './wishlists.component.html',
  styleUrl: './wishlists.component.scss'
})
export class WishlistsComponent implements OnInit {
  wishlists: Product[] = [];
  wishlistService = inject(WishlistService);

  ngOnInit() {
    this.wishlistService.init();
  }
}
