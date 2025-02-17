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
          label: "Caixas de Som",
          url: "/inventory/speakers"
        },
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
          label: "Monitores",
          url: "/inventory/monitors"
        },
        {
          label: "Mouses",
          url: "/inventory/mouses"
        },
        {
          label: "Placas de Rede",
          url: "/inventory/networkcards"
        },
        {
          label: "Placas de Vídeo",
          url: "/inventory/graphicscards"
        },
        {
          label: "Placas-Mãe",
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
    {
      id:"paid-softwares-nav",
      label: "Softwares",
      icon: "bi bi-windows",
      submenus:[
        {
          label: "Sistemas operacionais",
          url: "/softwares/operationalsystems"
        },
        {
          label: "Pacote Office",
          url: "/softwares/msoffices"
        },

      ]
    },
    {
      id:"documents-nav",
      label: "Documentos",
      icon: "bi bi-file-word",
      submenus:[
        {
          label: "Pedidos Compras",
          url: "/docs/purchaseorders"
        },

      ]
    },
/*    {
      id:"computers-nav",
      label: "Parque de máquinas",
      icon: "bi bi-pc-display-horizontal",
      submenus:[
        {
          label: "Departamentos",
          url: "/itassets/departments"
        },
        {
          label: "Computadores",
          url: "/itassets/computers"
        },

      ]
    },*/

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
