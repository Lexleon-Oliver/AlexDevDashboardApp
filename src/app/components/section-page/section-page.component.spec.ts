import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPageComponent } from './section-page.component';

describe('SectionPageComponent', () => {
  let component: SectionPageComponent;
  let fixture: ComponentFixture<SectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
