import { Injectable } from '@angular/core';
import { ThemeItem } from '../models/theme-item';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  private themes: ThemeItem[] = [
    {text: "Claro",  value: "light-theme"},
    {text: "Escuro",  value: "dark-theme"},
    {text: "Azul",  value: "blue-theme"},
  ];

  private selectedTheme!: ThemeItem;


  constructor() {
    this.loadSelectedTheme();
  }

  private loadSelectedTheme(): void {
    this.selectedTheme = this.themes.find(theme => theme.text === "Claro") || this.themes[0];

  }

  setSelectedTheme(theme: ThemeItem): void {
    this.selectedTheme = theme;

    if (typeof document!== 'undefined') {
      // Remove todas as classes de tema existentes do corpo
      document.body.classList.remove(...this.themes.map(t => t.value));

      // Adiciona a classe de tema selecionada ao corpo
      document.body.classList.add(theme.value);
    }
  }

  getSelectedTheme(): ThemeItem {
    return this.selectedTheme;
  }

  getThemes(): ThemeItem[] {
    return this.themes;
  }

  getThemeByText(themeText: string): ThemeItem  {
    return this.themes.find(theme => theme.text === themeText) || this.themes[0];
  }
}
