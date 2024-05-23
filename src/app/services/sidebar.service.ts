import { Injectable } from '@angular/core';
import { ItemMenu } from '../models/item-menu';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  constructor(
    private router: Router,
  ){

  }

  private menuList:ItemMenu[] = [
    {
      id:"dashboard-nav",
      label: "Dashboard",
      icon: "bi bi-grid",
      submenus: []
    },
    {
      id:"users-nav",
      label: "Usuários",
      icon: "bi bi-person",
      submenus:[
        {
          label: "Notificações",
          url: "/users/notifications"
        },
        {
          label: "Tarefas",
          url: "/users/tasks"
        }
      ]
    },
    {
      id:"components-nav",
      label: "Componentes",
      icon: "bi bi-menu-button-wide",
      submenus:[
        {
          label: "Cards",
          url: "/components/cards"
        }
      ]
    },

  ];

  getMenuList():ItemMenu[]{
    return this.menuList;
  }

  goToUrl(url: string){
    this.router.navigate([url]);
  }

  setActiveSubmenu(activeUrl: string) {
    for (let menu of this.menuList) {
      for (let submenu of menu.submenus) {
        submenu.active = (submenu.url === activeUrl);
      }
    }
  }
}
