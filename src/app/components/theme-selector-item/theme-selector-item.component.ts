import { Component, Input } from '@angular/core';
import { ThemeItem } from '../../models/theme-item';
import { ThemesService } from '../../services/themes.service';

@Component({
  selector: 'app-theme-selector-item',
  standalone: true,
  imports: [],
  templateUrl: './theme-selector-item.component.html',
  styleUrl: './theme-selector-item.component.scss'
})
export class ThemeSelectorItemComponent {

  @Input() theme!: ThemeItem;

  constructor(
    private themesService: ThemesService
  ){}

  selectTheme() {
    this.themesService.setSelectedTheme(this.theme);
  }
}
