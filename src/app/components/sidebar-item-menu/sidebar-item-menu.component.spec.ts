import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarItemMenuComponent } from './sidebar-item-menu.component';

describe('SidebarItemMenuComponent', () => {
  let component: SidebarItemMenuComponent;
  let fixture: ComponentFixture<SidebarItemMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarItemMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarItemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
