import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalSystemsPageComponent } from './operational-systems-page.component';

describe('OperationalSystemsPageComponent', () => {
  let component: OperationalSystemsPageComponent;
  let fixture: ComponentFixture<OperationalSystemsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationalSystemsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperationalSystemsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
