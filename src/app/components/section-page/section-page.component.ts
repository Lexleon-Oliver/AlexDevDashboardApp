import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-page',
  standalone: true,
  imports: [],
  templateUrl: './section-page.component.html',
  styleUrl: './section-page.component.scss'
})
export class SectionPageComponent {

  @Input() columnClass!: string;
}
