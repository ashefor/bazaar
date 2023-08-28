import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent {

  refresh() {
    window.location.reload();
  }
}
