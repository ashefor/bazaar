import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Modal, ModalInterface, ModalOptions } from 'flowbite';
import { Product } from '@core/interfaces/product.interface';
import { productSizes } from '@core/utils/constants';
import { FormsModule } from '@angular/forms';
import { ImageUrlPipe } from '@shared/pipes/image-url.pipe';
import { Subject } from 'rxjs/internal/Subject';
import { StoreService } from '@core/services/store.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FormsModule, ImageUrlPipe, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, AfterViewInit {
  @ViewChild('productReviewModalRef', { static: true, read: ElementRef }) productReviewModalRef?: ElementRef;
  @Input() product!: Product;
  private readonly service = inject(StoreService);
  private readonly destroy$ = new Subject<boolean>();
  private readonly _storage = inject(StorageMap)
  isAddingToCart = false
  productReviewModal?: ModalInterface;
  productSizes = productSizes;
  modalOptions: ModalOptions = {
    placement: 'center',
    closable: false
  }

  ngOnInit(): void {
    this.getCartItems()
  }
  ngAfterViewInit(): void {
    this.productReviewModal = new Modal(this.productReviewModalRef?.nativeElement, this.modalOptions);
  }

  openProductReviewModal() {
    this.productReviewModal?.show();
  }

  closeProductReviewModal() {
    this.productReviewModal?.hide();
  }

  addToCart() {
    const params = {
      id: this.product._id,
      product: this.product,
      quantity: 1
    }
    this.isAddingToCart = true;
    this.service.getCartItem(this.product._id).pipe(mergeMap((cart: any) => {
      if (cart) {
        return this.service.updateCartItem({...params, quantity: Number(cart.quantity) + 1})
      } else {
        return this.service.addProductToCart(params)
      }
    }
    ))
    .subscribe({
      next: (data) => {
        this.closeProductReviewModal();
        this.isAddingToCart = false;
      },
      error: (e) => {
        console.log(e)
        this.isAddingToCart = false
      }
    })
  }

  getCartItems() {
    // this.service.getCartItems().subscribe({
    //   next: d => {
    //     console.log(d)
    //   }
    // })
    // this._storage.clear().subscribe({
    //   next: d => {
    //     console.log(d)
    //   }
    // })
  }
}
