import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsItemListComponent } from './notifications-item-list.component';

describe('NotificationsItemListComponent', () => {
  let component: NotificationsItemListComponent;
  let fixture: ComponentFixture<NotificationsItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsItemListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationsItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
