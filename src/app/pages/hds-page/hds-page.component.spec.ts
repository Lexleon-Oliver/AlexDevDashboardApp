import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HdsPageComponent } from './hds-page.component';

describe('HdsPageComponent', () => {
  let component: HdsPageComponent;
  let fixture: ComponentFixture<HdsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HdsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HdsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
