import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacInputFormComponent } from './mac-input-form.component';

describe('MacInputFormComponent', () => {
  let component: MacInputFormComponent;
  let fixture: ComponentFixture<MacInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacInputFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MacInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
