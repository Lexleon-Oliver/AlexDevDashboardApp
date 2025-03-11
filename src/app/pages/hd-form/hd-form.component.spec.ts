import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HdFormComponent } from './hd-form.component';

describe('HdFormComponent', () => {
  let component: HdFormComponent;
  let fixture: ComponentFixture<HdFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HdFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
