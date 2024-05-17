import { Component } from '@angular/core';
import { ThemeSelectorDropdownComponent } from '../theme-selector-dropdown/theme-selector-dropdown.component';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [
    ThemeSelectorDropdownComponent,
  ],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.scss'
})
export class ThemeSelectorComponent {

}
