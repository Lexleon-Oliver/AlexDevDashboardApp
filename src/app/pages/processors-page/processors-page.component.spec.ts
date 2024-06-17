import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorsPageComponent } from './processors-page.component';

describe('ProcessorsPageComponent', () => {
  let component: ProcessorsPageComponent;
  let fixture: ComponentFixture<ProcessorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessorsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
