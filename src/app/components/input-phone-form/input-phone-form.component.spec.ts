import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPhoneFormComponent } from './input-phone-form.component';

describe('InputPhoneFormComponent', () => {
  let component: InputPhoneFormComponent;
  let fixture: ComponentFixture<InputPhoneFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPhoneFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputPhoneFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
