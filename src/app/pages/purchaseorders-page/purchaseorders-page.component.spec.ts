import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseordersPageComponent } from './purchaseorders-page.component';

describe('PurchaseordersPageComponent', () => {
  let component: PurchaseordersPageComponent;
  let fixture: ComponentFixture<PurchaseordersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseordersPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseordersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
