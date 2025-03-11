import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLayoutNocolumnComponent } from './page-layout-nocolumn.component';

describe('PageLayoutNocolumnComponent', () => {
  let component: PageLayoutNocolumnComponent;
  let fixture: ComponentFixture<PageLayoutNocolumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLayoutNocolumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageLayoutNocolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
