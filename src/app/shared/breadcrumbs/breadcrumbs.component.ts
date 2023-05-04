import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
    `
      .content {
        padding: 0 0.5rem;
      }
    `,
  ],
})
export class BreadcrumbsComponent implements OnInit {
  @Input() titulo: string = '';

  @Input() subtituloProceso: string = '';

  @Input() subtituloOperacion: string = '';

  constructor() {}

  ngOnInit(): void {}
}
