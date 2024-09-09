import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsCardFormComponent } from './graphics-card-form.component';

describe('GraphicsCardFormComponent', () => {
  let component: GraphicsCardFormComponent;
  let fixture: ComponentFixture<GraphicsCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicsCardFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphicsCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
