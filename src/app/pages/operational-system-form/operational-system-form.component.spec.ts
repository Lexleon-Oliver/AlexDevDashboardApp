import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalSystemFormComponent } from './operational-system-form.component';

describe('OperationalSystemFormComponent', () => {
  let component: OperationalSystemFormComponent;
  let fixture: ComponentFixture<OperationalSystemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationalSystemFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperationalSystemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
