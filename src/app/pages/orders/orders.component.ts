import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { Subject } from 'rxjs/internal/Subject';
import { StoreService } from '@core/services/store.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Order } from '@core/interfaces/cart.interface';
import { ImageUrlPipe } from '@shared/pipes/image-url.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ImageUrlPipe, RouterModule, PageHeaderComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<boolean>();
  private readonly service = inject(StoreService);
  isFetchingOrders = false;
  orders: Order[] = [];
  isFetchingInvoice = true;

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.isFetchingOrders = true;
    this.service.fetchOrders().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        console.log(data);
        this.orders = data.orders;
        this.isFetchingOrders = false;
      },
      error: () => {
        this.isFetchingOrders = false;
      }
    })
  }

  viewInvoice(order_id: string) {
    this.isFetchingInvoice = true;
    this.service.viewInvoice(order_id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.isFetchingInvoice = false;
        window.open(data.link)
      },
      error: () => {
        this.isFetchingInvoice = false;
      }
    })
  }
}
