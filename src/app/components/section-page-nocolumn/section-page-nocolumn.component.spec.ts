import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPageNocolumnComponent } from './section-page-nocolumn.component';

describe('SectionPageNocolumnComponent', () => {
  let component: SectionPageNocolumnComponent;
  let fixture: ComponentFixture<SectionPageNocolumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionPageNocolumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionPageNocolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
