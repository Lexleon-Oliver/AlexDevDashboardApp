import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullNotificationItemComponent } from './full-notification-item.component';

describe('FullNotificationItemComponent', () => {
  let component: FullNotificationItemComponent;
  let fixture: ComponentFixture<FullNotificationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullNotificationItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullNotificationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
