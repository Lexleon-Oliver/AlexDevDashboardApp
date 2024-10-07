import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersPageComponent } from './computers-page.component';

describe('ComputersPageComponent', () => {
  let component: ComputersPageComponent;
  let fixture: ComponentFixture<ComputersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputersPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComputersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
