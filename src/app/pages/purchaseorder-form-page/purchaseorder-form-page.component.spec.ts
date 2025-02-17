import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseorderFormPageComponent } from './purchaseorder-form-page.component';

describe('PurchaseorderFormPageComponent', () => {
  let component: PurchaseorderFormPageComponent;
  let fixture: ComponentFixture<PurchaseorderFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseorderFormPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseorderFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
