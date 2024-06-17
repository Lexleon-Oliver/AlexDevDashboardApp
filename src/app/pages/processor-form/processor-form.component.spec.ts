import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorFormComponent } from './processor-form.component';

describe('ProcessorFormComponent', () => {
  let component: ProcessorFormComponent;
  let fixture: ComponentFixture<ProcessorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
