import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Data, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { filter, map, mergeMap, tap } from 'rxjs';
import { MetaService } from '@core/services/meta.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecommerce';
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly metaService = inject(MetaService);

  ngOnInit(): void {
    initFlowbite();
    this.setupPageMetaTags();
  }

  setupPageMetaTags() : void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          return this.activatedRoute
        }),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
        tap(({title, description }: Data) => {
          this.metaService.updateTitle(title);
          this.metaService.updateDescription(description);
        })
      ).subscribe();
  }
}
