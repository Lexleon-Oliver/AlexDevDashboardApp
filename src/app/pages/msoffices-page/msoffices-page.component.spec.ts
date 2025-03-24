import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsofficesPageComponent } from './msoffices-page.component';

describe('MsofficesPageComponent', () => {
  let component: MsofficesPageComponent;
  let fixture: ComponentFixture<MsofficesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsofficesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MsofficesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
