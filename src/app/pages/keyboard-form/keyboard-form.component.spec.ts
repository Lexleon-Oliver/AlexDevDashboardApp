import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardFormComponent } from './keyboard-form.component';

describe('KeyboardFormComponent', () => {
  let component: KeyboardFormComponent;
  let fixture: ComponentFixture<KeyboardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeyboardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
