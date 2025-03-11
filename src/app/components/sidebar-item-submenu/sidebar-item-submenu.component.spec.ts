import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarItemSubmenuComponent } from './sidebar-item-submenu.component';

describe('SidebarItemSubmenuComponent', () => {
  let component: SidebarItemSubmenuComponent;
  let fixture: ComponentFixture<SidebarItemSubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarItemSubmenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarItemSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
