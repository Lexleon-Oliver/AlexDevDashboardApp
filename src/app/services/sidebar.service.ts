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
        },
        {
          label: 'Adicionar Novo',
          url: '/users/new',
        }
      ]
    },
    {
      id:"inventory-nav",
      label: "Estoque",
      icon: "bi bi-archive",
      submenus:[
        {
          label: "Fontes de Energia",
          url: "/inventory/powersupplies"
        },
        {
          label: "Gabinetes",
          url: "/inventory/cases"
        },
        {
          label: "Hds",
          url: "/inventory/hds"
        },
        {
          label: "Memórias",
          url: "/inventory/memories"
        },
        {
          label: "Mouses",
          url: "/inventory/mouses"
        },
        {
          label: "Placas-mãe",
          url: "/inventory/motherboards"
        },
        {
          label: "Processadores",
          url: "/inventory/cpus"
        },
        {
          label: "Teclados",
          url: "/inventory/keyboards"
        },
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
