import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule, ReactiveFormsModule, MatInputModule, MatRadioModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {
  cartService = inject(CartService);
  formBuilder = inject(FormBuilder);
  orderService = inject(OrderService);
  router = inject(Router);
  orderStep: number = 0;
  paymentType = 'cash';

  addressForm = this.formBuilder.group({
    address1: [''],
    address2: [''],
    city: [''],
    pincode: ['']
  })

  ngOnInit() {
    this.cartService.init();
  }

  get cartItems() {
    return this.cartService.items;
  }

  sellingPrice(product: Product): number {
    return +(product.price - (product.price * product.discount / 100)).toFixed(0);
  }

  addToCart(productId: string, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe(result => {
      this.cartService.init();
    })
  }
  get subtotal() {
    return this.cartItems.reduce((total, item) => total + this.sellingPrice(item.product) * item.quantity, 0);
  }


  get shipping() {
    return this.cartItems.length > 0 ? 150 : 0;
  }


  get tax() {
    const taxRate = 0.18; // 18% tax
    return this.cartItems ? (+(this.subtotal * taxRate).toFixed(0)) : 0;
  }


  get total() {
    return this.subtotal + this.shipping + this.tax;
  }


  removeFromCart(item: any) {
    this.cartService.removeFromCart(item.product._id).subscribe(result => {
      this.cartService.init();
    })
  }

  checkout() {
    this.orderStep = 1;
  }

  addAddress() {
    this.orderStep = 2;
  }

  completeOrder() {
    let order = {
      items: this.cartItems,
      paymentType: this.paymentType,
      address: this.addressForm.value,
      date: new Date(),
    }
    this.orderService.addOrder(order).subscribe(result => {
      alert("Your order is completed");
      this.cartService.init();
      this.orderStep = 0;
      this.router.navigateByUrl('/orders');
    })
  }
}