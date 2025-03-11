import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsCardsPageComponent } from './graphics-cards-page.component';

describe('GraphicsCardsPageComponent', () => {
  let component: GraphicsCardsPageComponent;
  let fixture: ComponentFixture<GraphicsCardsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicsCardsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphicsCardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
