import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSelectorDropdownComponent } from './theme-selector-dropdown.component';

describe('ThemeSelectorDropdownComponent', () => {
  let component: ThemeSelectorDropdownComponent;
  let fixture: ComponentFixture<ThemeSelectorDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSelectorDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemeSelectorDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
