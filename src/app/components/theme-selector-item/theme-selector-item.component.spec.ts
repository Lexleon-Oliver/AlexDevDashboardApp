import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSelectorItemComponent } from './theme-selector-item.component';

describe('ThemeSelectorItemComponent', () => {
  let component: ThemeSelectorItemComponent;
  let fixture: ComponentFixture<ThemeSelectorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSelectorItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemeSelectorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
