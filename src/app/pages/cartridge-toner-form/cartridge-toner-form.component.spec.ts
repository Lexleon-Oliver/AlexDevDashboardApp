import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartridgeTonerFormComponent } from './cartridge-toner-form.component';

describe('CartridgeTonerFormComponent', () => {
  let component: CartridgeTonerFormComponent;
  let fixture: ComponentFixture<CartridgeTonerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartridgeTonerFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartridgeTonerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
