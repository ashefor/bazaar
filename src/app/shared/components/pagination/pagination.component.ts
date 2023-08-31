import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Output() pageChange = new EventEmitter<number>();
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 12;
  @Input() pageSize: number = 12;
  @Input() totalPages: number = 1;
  @Input() disableButtons = false
  @Input() pageLimit: number = 12;
  @Input() pageStart: number = 1;


  previousPage() {
    this.currentPage -= 1;
    this.pageChange.emit(this.currentPage);
  }

  nextPage() {
    this.currentPage += 1;
    this.pageChange.emit(this.currentPage);
  }
}
