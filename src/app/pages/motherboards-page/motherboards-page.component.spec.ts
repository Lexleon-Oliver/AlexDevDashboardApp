import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotherboardsPageComponent } from './motherboards-page.component';

describe('MotherboardsPageComponent', () => {
  let component: MotherboardsPageComponent;
  let fixture: ComponentFixture<MotherboardsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotherboardsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotherboardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
