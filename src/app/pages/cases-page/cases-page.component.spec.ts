import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesPageComponent } from './cases-page.component';

describe('CasesPageComponent', () => {
  let component: CasesPageComponent;
  let fixture: ComponentFixture<CasesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CasesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
