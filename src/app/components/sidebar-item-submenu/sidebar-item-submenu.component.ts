import { Component, Input } from '@angular/core';
import { ItemSubmenu } from '../../models/item-submenu';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar-item-submenu',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-item-submenu.component.html',
  styleUrl: './sidebar-item-submenu.component.scss'
})
export class SidebarItemSubmenuComponent {

  @Input() submenu!: ItemSubmenu;

  constructor(
    private sidebarService: SidebarService
  ){
  }

  redirect() {
    this.sidebarService.setActiveSubmenu(this.submenu.url);
    this.sidebarService.goToUrl(this.submenu.url);
  }
}
