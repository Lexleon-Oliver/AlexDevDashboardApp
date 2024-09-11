import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorsPageComponent } from './monitors-page.component';

describe('MonitorsPageComponent', () => {
  let component: MonitorsPageComponent;
  let fixture: ComponentFixture<MonitorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonitorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
