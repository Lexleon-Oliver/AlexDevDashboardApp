import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormDisabledComponent } from './input-form-disabled.component';

describe('InputFormDisabledComponent', () => {
  let component: InputFormDisabledComponent;
  let fixture: ComponentFixture<InputFormDisabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFormDisabledComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputFormDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
