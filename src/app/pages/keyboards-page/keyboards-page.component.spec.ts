import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardsPageComponent } from './keyboards-page.component';

describe('KeyboardsPageComponent', () => {
  let component: KeyboardsPageComponent;
  let fixture: ComponentFixture<KeyboardsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeyboardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
