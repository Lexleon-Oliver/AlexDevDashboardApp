import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeItemPillComponent } from './badge-item-pill.component';

describe('BadgeItemPillComponent', () => {
  let component: BadgeItemPillComponent;
  let fixture: ComponentFixture<BadgeItemPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeItemPillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BadgeItemPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
