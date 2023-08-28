import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs/internal/Subject';
import { StoreService } from '@core/services/store.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Order } from '@core/interfaces/cart.interface';
import { ImageUrlPipe } from '@shared/pipes/image-url.pipe';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, ImageUrlPipe],
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  @Input() reference: string = '';
  private readonly destroy$ = new Subject<boolean>();
  private readonly service = inject(StoreService);
  order?: Order;
  isFetchingSummary = false;

  ngOnInit(): void {
    this.verifyReference();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  verifyReference() {
    if (this.reference) {
      this.isFetchingSummary = true;
      this.service.verifyPaystackOrder(this.reference).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.order = data.order;
          this.isFetchingSummary = false;
        },
        error: () => {
          this.isFetchingSummary = false;
        }
      })
    }
  }
}
