import { Injectable } from '@angular/core';
import { ThemeItem } from '../models/theme-item';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  private readonly apiUrl = environment.apiUrl;

  private themes: ThemeItem[] = [
    {text: "Claro",  value: "light-theme"},
    {text: "Escuro",  value: "dark-theme"},
    {text: "Azul",  value: "blue-theme"},
  ];

  private selectedTheme!: ThemeItem;


  constructor(
    private http: HttpClient
  ) {
  }

  setSelectedTheme(theme: ThemeItem): void {
    this.selectedTheme = theme;
    this.applyTheme(theme);
    this.http.put(`${this.apiUrl}/users/mydetails/themes`, { theme: theme.text }).subscribe({
      next: (data) => {
        console.log('Tema atualizado com sucesso:', data);
      },
      error: (error) => {
        console.error('Erro ao enviar o tema para o servidor:', error);
      }
    });
  }

  applyTheme(theme: ThemeItem):void{
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

  setInitialTheme(themeUser: string) {
    this.selectedTheme = this.themes.find(theme => theme.text === themeUser) || this.themes[0];
    this.applyTheme(this.selectedTheme);
  }
}
