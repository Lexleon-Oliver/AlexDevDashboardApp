import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartridgeTonersComponent } from './cartridge-toners.component';

describe('CartridgeTonersComponent', () => {
  let component: CartridgeTonersComponent;
  let fixture: ComponentFixture<CartridgeTonersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartridgeTonersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartridgeTonersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
