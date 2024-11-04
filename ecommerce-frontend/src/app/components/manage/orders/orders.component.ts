import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order';
import { CommonModule, DatePipe } from '@angular/common';
import { Product } from '../../../models/product';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, MatButtonToggleModule, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orderService = inject(OrderService);
  orders: Order[] = [];

  ngOnInit() {
    this.orderService.getAdminOrder().subscribe((result: any) => {
      this.orders = result.orders;
    })
  }

  sellingPrice(product: Product): number {
    return +(product.price - (product.price * product.discount / 100)).toFixed(0);
  }
  statusChanged(button: any, order: Order) {
    this.orderService.updateOrderStatus(order._id!, button.value).subscribe(result => {
      alert("Order status updated!");
    })
  }

}
