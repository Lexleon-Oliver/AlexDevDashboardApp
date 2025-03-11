import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartridgeTonersPageComponent } from './cartridge-toners-page.component';

describe('CartridgeTonersPageComponent', () => {
  let component: CartridgeTonersPageComponent;
  let fixture: ComponentFixture<CartridgeTonersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartridgeTonersPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartridgeTonersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
