import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderedTabsComponent } from './bordered-tabs.component';

describe('BorderedTabsComponent', () => {
  let component: BorderedTabsComponent;
  let fixture: ComponentFixture<BorderedTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorderedTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorderedTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
