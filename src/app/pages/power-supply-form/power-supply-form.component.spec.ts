import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerSupplyFormComponent } from './power-supply-form.component';

describe('PowerSupplyFormComponent', () => {
  let component: PowerSupplyFormComponent;
  let fixture: ComponentFixture<PowerSupplyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerSupplyFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PowerSupplyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
