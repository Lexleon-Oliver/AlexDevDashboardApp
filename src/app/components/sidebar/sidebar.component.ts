import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';
import { ItemMenu } from '../../models/item-menu';
import { SidebarItemMenuComponent } from '../sidebar-item-menu/sidebar-item-menu.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarItemMenuComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  menuList!: ItemMenu[];

  constructor(
    private sidebarMenulistService: SidebarService
  ){
    this.menuList = this.sidebarMenulistService.getMenuList();
  }

}
