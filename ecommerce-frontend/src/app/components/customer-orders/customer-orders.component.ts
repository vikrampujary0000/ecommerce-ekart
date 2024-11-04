import { Component, inject, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.scss'
})
export class CustomerOrdersComponent implements OnInit {
  orders: Order[] = [];
  orderService = inject(OrderService);

  ngOnInit() {
    this, this.orderService.getCustomerOrders().subscribe((result: any) => {
      this.orders = result.orders;
    })
  }

  sellingPrice(product: Product): number {
    return +(product.price - (product.price * product.discount / 100)).toFixed(0);
  }

}
