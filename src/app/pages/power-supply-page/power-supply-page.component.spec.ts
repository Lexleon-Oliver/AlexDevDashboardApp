import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerSupplyPageComponent } from './power-supply-page.component';

describe('PowerSupplyPageComponent', () => {
  let component: PowerSupplyPageComponent;
  let fixture: ComponentFixture<PowerSupplyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerSupplyPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PowerSupplyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
